/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the PDF converter monthly plan (¥300/mo).
 *
 * Environment variables needed:
 *   STRIPE_SECRET_KEY        — Stripe secret key (sk_live_... or sk_test_...)
 *   STRIPE_PRICE_ID          — Stripe Price ID for the ¥300/mo recurring plan
 *   NEXT_PUBLIC_SITE_URL     — e.g. https://divizero.jp
 */

import { NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

export async function POST(request: Request) {
  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: "Stripe is not configured on this server." },
      { status: 503 },
    );
  }

  // Optional: read metadata from the request body
  let customerId: string | undefined;
  try {
    const body = await request.json().catch(() => ({}));
    customerId = typeof body.customerId === "string" ? body.customerId : undefined;
  } catch {
    // ignore parse errors
  }

  // Build the Stripe Checkout Session via the REST API (no SDK dependency)
  const params = new URLSearchParams({
    "line_items[0][price]": STRIPE_PRICE_ID,
    "line_items[0][quantity]": "1",
    mode: "subscription",
    success_url: `${SITE_URL}/tools/pdf-converter?upgraded=1`,
    cancel_url: `${SITE_URL}/tools/pdf-converter?cancelled=1`,
    "locale": "ja",
    "payment_method_types[0]": "card",
  });

  if (customerId) {
    params.set("customer", customerId);
  }

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

  return NextResponse.redirect(session.url, 303);
}

/** HEAD / OPTIONS for preflight */
export async function GET() {
  return NextResponse.redirect(`${SITE_URL}/tools/pdf-converter`, 302);
}
