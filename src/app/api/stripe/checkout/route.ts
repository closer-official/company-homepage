/**
 * POST /api/stripe/checkout
 *
 * PDF 変換ツール有料プラン（月額）の Checkout Session を作成。
 * リクエスト JSON: { "firebaseUid": "<Firebase Auth uid>" } 必須（アカウント紐付け）
 *
 * 環境変数:
 *   STRIPE_SECRET_KEY, STRIPE_PRICE_ID, NEXT_PUBLIC_SITE_URL
 */

import { NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

function isValidFirebaseUid(uid: string): boolean {
  return (
    uid.length >= 10 &&
    uid.length <= 128 &&
    /^[A-Za-z0-9_-]+$/.test(uid)
  );
}

export async function POST(request: Request) {
  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: "Stripe is not configured on this server." },
      { status: 503 },
    );
  }

  let firebaseUid: string | undefined;
  try {
    const body = (await request.json().catch(() => ({}))) as {
      firebaseUid?: unknown;
    };
    firebaseUid =
      typeof body.firebaseUid === "string" ? body.firebaseUid : undefined;
  } catch {
    firebaseUid = undefined;
  }

  if (!firebaseUid || !isValidFirebaseUid(firebaseUid)) {
    return NextResponse.json(
      { error: "firebaseUid is required for checkout." },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    "line_items[0][price]": STRIPE_PRICE_ID,
    "line_items[0][quantity]": "1",
    mode: "subscription",
    success_url: `${SITE_URL}/tools/pdf-converter?upgraded=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/tools/pdf-converter?cancelled=1`,
    locale: "ja",
    "payment_method_types[0]": "card",
    client_reference_id: firebaseUid,
  });
  params.set(
    "subscription_data[metadata][firebaseUid]",
    firebaseUid,
  );

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!stripeRes.ok) {
    const err = await stripeRes.json().catch(() => ({}));
    console.error("[stripe/checkout] Stripe API error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }

  const session = (await stripeRes.json()) as { url: string };
  return NextResponse.json({ url: session.url });
}

export async function GET() {
  return NextResponse.redirect(`${SITE_URL}/tools/pdf-converter`, 302);
}
