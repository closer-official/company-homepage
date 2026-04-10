import * as admin from "firebase-admin";

/**
 * サーバー専用（Stripe Webhook 等）。環境変数 FIREBASE_SERVICE_ACCOUNT_KEY に
 * サービスアカウント JSON の文字列を設定（Vercel では 1 行 JSON または Base64 運用可）。
 */
export function getFirebaseAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
  }
  const json =
    raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const cred = JSON.parse(json) as admin.ServiceAccount;
  return admin.initializeApp({
    credential: admin.credential.cert(cred),
  });
}

export function getAdminFirestore(): admin.firestore.Firestore {
  return getFirebaseAdminApp().firestore();
}
