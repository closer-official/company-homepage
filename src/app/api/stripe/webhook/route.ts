/**
 * Stripe → Firestore（有料 PDF プランの有効／無効）
 *
 * 必要な環境変数:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET
 *   FIREBASE_SERVICE_ACCOUNT_KEY
 */

import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY ?? "";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(request: Request) {
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  const rawBody = Buffer.from(await request.arrayBuffer());
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[stripe/webhook] signature verify failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const db = getAdminFirestore();
    const col = db.collection("pdfConverterSubscribers");

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription") {
        return NextResponse.json({ received: true });
      }
      const uid = session.client_reference_id;
      const subRaw = session.subscription;
      const subId =
        typeof subRaw === "string" ? subRaw : subRaw?.id ?? null;
      if (!uid || !subId) {
        console.warn("[stripe/webhook] missing uid or subscription id");
        return NextResponse.json({ received: true });
      }
      await col.doc(uid).set(
        {
          active: true,
          stripeSubscriptionId: subId,
          stripeCustomerId:
            typeof session.customer === "string"
              ? session.customer
              : session.customer?.id ?? null,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    }

    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      const uid = sub.metadata?.firebaseUid;
      if (uid) {
        await col.doc(uid).set(
          {
            active: false,
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
    }

    if (event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription;
      const uid = sub.metadata?.firebaseUid;
      if (uid) {
        const active =
          sub.status === "active" ||
          sub.status === "trialing" ||
          sub.status === "past_due";
        await col.doc(uid).set(
          {
            active,
            stripeSubscriptionId: sub.id,
            stripeCustomerId:
              typeof sub.customer === "string"
                ? sub.customer
                : sub.customer?.id ?? null,
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
    }
  } catch (err) {
    console.error("[stripe/webhook] handler error", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
