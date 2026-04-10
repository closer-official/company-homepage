import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const hasWebAuth =
  typeof process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "string" &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 0;

const firebaseConfig = hasWebAuth
  ? {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
      authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
        `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "closer-official"}.firebaseapp.com`,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "closer-official",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    }
  : {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "closer-official",
    };

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;

const db = getFirestore(app);

/** メール／パスワード認証（PDF ツール有料プラン等）。未設定時は null */
const firebaseAuth: Auth | null = hasWebAuth ? getAuth(app) : null;

function isFirebaseAuthEnabled(): boolean {
  return firebaseAuth !== null;
}

export { db, firebaseAuth, isFirebaseAuthEnabled };
