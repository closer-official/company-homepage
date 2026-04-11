/**
 * Stripe Customer Portal へのリンクを発行（解約・支払い方法など）。
 *
 * POST（ボディ不要）
 * Header: Authorization: Bearer <Firebase ID トークン>
 *
 * Firestore pdfConverterSubscribers/{uid} が active で、Stripe 顧客 IDと紐づいていること。
 */

import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore, getFirebaseAdminApp } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

export async function POST(request: Request) {
  if (!stripeSecret) {
    return NextResponse.json(
      { error: "Stripe is not configured on this server." },
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

  const db = getAdminFirestore();
  const snap = await db.collection("pdfConverterSubscribers").doc(firebaseUid).get();
  if (!snap.exists) {
    return NextResponse.json(
      { error: "契約情報が見つかりません。有料プランに未登録の可能性があります。" },
      { status: 404 },
    );
  }

  const data = snap.data() as {
    active?: boolean;
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
  };

  if (!data?.active) {
    return NextResponse.json(
      { error: "有効な有料プランが見つかりません。" },
      { status: 400 },
    );
  }

  const stripe = new Stripe(stripeSecret);

  let customerId = data.stripeCustomerId?.trim() || null;
  if (!customerId && data.stripeSubscriptionId) {
    try {
      const sub = await stripe.subscriptions.retrieve(data.stripeSubscriptionId);
      const c = sub.customer;
      customerId = typeof c === "string" ? c : c?.id ?? null;
    } catch (e) {
      console.error("[stripe/billing-portal] subscription retrieve failed", e);
    }
  }

  if (!customerId) {
    return NextResponse.json(
      {
        error:
          "Stripe の顧客情報と紐づいていません。しばらく待って再度お試しください。解消しない場合はお問い合わせください。",
      },
      { status: 400 },
    );
  }

  const returnUrl = `${SITE_URL.replace(/\/$/, "")}/tools/pdf-converter?subscription_portal=1`;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
      locale: "ja",
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[stripe/billing-portal] portal create failed", e);
    const msg =
      e instanceof Error && e.message.includes("configuration")
        ? "Stripe ダッシュボードで「顧客ポータル」の有効化が必要です（Billing → Customer portal）。"
        : "顧客ポータルを開けませんでした。Stripe の設定をご確認ください。";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
