/**
 * Stripe Checkout 完了後のリダイレクト用フォールバック。
 * Webhook が未設定・失敗・遅延していても、session_id で検証して Firestore を同期する。
 *
 * POST JSON: { "sessionId": "cs_..." }
 * Header: Authorization: Bearer <Firebase ID トークン>
 * （セッションの client_reference_id とトークンの uid が一致することを必須）
 */

import { FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore, getFirebaseAdminApp } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY ?? "";

export async function POST(request: Request) {
  if (!stripeSecret) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 },
    );
  }

  let adminApp: ReturnType<typeof getFirebaseAdminApp>;
  try {
    adminApp = getFirebaseAdminApp();
  } catch {
    return NextResponse.json(
      { error: "FIREBASE_SERVICE_ACCOUNT_KEY is not configured on the server." },
      { status: 503 },
    );
  }

  const authHeader = request.headers.get("authorization");
  const m = authHeader?.match(/^Bearer\s+(.+)$/i);
  const idToken = m?.[1]?.trim();
  if (!idToken) {
    return NextResponse.json(
      { error: "Missing Firebase ID token." },
      { status: 401 },
    );
  }

  let sessionId: string;
  try {
    const body = (await request.json()) as { sessionId?: unknown };
    sessionId =
      typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  } catch {
    sessionId = "";
  }
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid sessionId." }, { status: 400 });
  }

  let firebaseUid: string;
  try {
    const decoded = await getAuth(adminApp).verifyIdToken(idToken);
    firebaseUid = decoded.uid;
  } catch {
    return NextResponse.json(
      { error: "Invalid Firebase ID token." },
      { status: 401 },
    );
  }

  const stripe = new Stripe(stripeSecret);
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });
  } catch (e) {
    console.error("[stripe/confirm-session] retrieve failed", e);
    return NextResponse.json(
      { error: "Could not retrieve checkout session." },
      { status: 400 },
    );
  }

  if (session.mode !== "subscription") {
    return NextResponse.json({ error: "Not a subscription checkout." }, { status: 400 });
  }
  if (session.status !== "complete") {
    return NextResponse.json(
      { error: "Checkout session is not complete." },
      { status: 400 },
    );
  }

  const refUid = session.client_reference_id?.trim();
  if (!refUid || refUid !== firebaseUid) {
    return NextResponse.json(
      { error: "Session does not match the signed-in account." },
      { status: 403 },
    );
  }

  const subRaw = session.subscription;
  const subId =
    typeof subRaw === "string" ? subRaw : (subRaw as Stripe.Subscription | null)?.id;
  if (!subId) {
    return NextResponse.json(
      { error: "No subscription on this session." },
      { status: 400 },
    );
  }

  const cust = session.customer;
  const customerId =
    typeof cust === "string" ? cust : (cust as Stripe.Customer | null)?.id ?? null;

  const db = getAdminFirestore();
  await db.collection("pdfConverterSubscribers").doc(firebaseUid).set(
    {
      active: true,
      stripeSubscriptionId: subId,
      stripeCustomerId: customerId,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true });
}
