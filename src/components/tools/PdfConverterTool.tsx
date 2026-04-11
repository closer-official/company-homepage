"use client";

import Link from "next/link";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
  type User,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { db, firebaseAuth, isFirebaseAuthEnabled } from "@/lib/firebase";
import "./pdf-converter.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type ConvertFile = {
  id: string;
  file: File;
  previewUrl: string | null;
  status: "idle" | "converting" | "done" | "error";
  errorMsg?: string;
};

type HistoryEntry = {
  id: string;
  filename: string;
  fileCount: number;
  createdAt: number;
  pdfDataUrl: string;
};

const FREE_LIMIT = 1;
const PAID_LIMIT = 20;
const HISTORY_STORAGE_KEY = "divisero_pdf_history";
const PLAN_STORAGE_KEY = "divisero_pdf_plan";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function formatDate(epoch: number) {
  return new Date(epoch).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function imagesToPdfDataUrl(files: File[]): Promise<string> {
  const { jsPDF } = await import("jspdf");

  const dataUrls = await Promise.all(
    files.map(
      (f) =>
        new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(f);
        }),
    ),
  );

  let pdf: InstanceType<typeof jsPDF> | null = null;

  for (let i = 0; i < dataUrls.length; i++) {
    const img = await loadImage(dataUrls[i]);
    const landscape = img.naturalWidth > img.naturalHeight;
    const format = "a4";

    if (i === 0) {
      pdf = new jsPDF({
        orientation: landscape ? "landscape" : "portrait",
        unit: "mm",
        format,
      });
    } else {
      pdf!.addPage(format, landscape ? "landscape" : "portrait");
    }

    const pw = pdf!.internal.pageSize.getWidth();
    const ph = pdf!.internal.pageSize.getHeight();
    const ratio = Math.min(pw / img.naturalWidth, ph / img.naturalHeight);
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    const x = (pw - w) / 2;
    const y = (ph - h) / 2;

    const mimeType = files[i].type === "image/png" ? "PNG" : "JPEG";
    pdf!.addImage(dataUrls[i], mimeType, x, y, w, h);
  }

  return pdf!.output("datauristring");
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

function loadHistory(storageKey: string | null): HistoryEntry[] {
  if (!storageKey) return [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

function saveHistory(storageKey: string | null, entries: HistoryEntry[]) {
  if (!storageKey) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  } catch {
    // QuotaExceededError
  }
}

function loadLegacyPlan(): "free" | "paid" {
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    return raw === "paid" ? "paid" : "free";
  } catch {
    return "free";
  }
}

type AuthModalMode = "login" | "register" | "forgot";

// ─── Component ────────────────────────────────────────────────────────────────

export default function PdfConverterTool() {
  const authEnabled = isFirebaseAuthEnabled();

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [legacyPaid, setLegacyPaid] = useState(false);

  const [files, setFiles] = useState<ConvertFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
  const [resultFilename, setResultFilename] = useState("converted.pdf");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [tab, setTab] = useState<"convert" | "history">("convert");
  const [dragOver, setDragOver] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authPassword2, setAuthPassword2] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const [resetOobCode, setResetOobCode] = useState<string | null>(null);
  const [resetEmailPreview, setResetEmailPreview] = useState<string | null>(
    null,
  );
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetNewPassword2, setResetNewPassword2] = useState("");
  const [resetBusy, setResetBusy] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const historyKeyRef = useRef<string | null>(null);

  const isPaid = authEnabled ? subscriptionActive : legacyPaid;

  const historyStorageKey = useMemo(() => {
    if (!authEnabled) return HISTORY_STORAGE_KEY;
    if (user && subscriptionActive) {
      return `${HISTORY_STORAGE_KEY}_${user.uid}`;
    }
    return null;
  }, [authEnabled, user, subscriptionActive]);

  historyKeyRef.current = historyStorageKey;

  const limit = isPaid ? PAID_LIMIT : FREE_LIMIT;

  // Firebase Auth
  useEffect(() => {
    if (!firebaseAuth) {
      setAuthReady(true);
      return;
    }
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Subscription doc
  useEffect(() => {
    if (!authEnabled || !user) {
      setSubscriptionActive(false);
      return;
    }
    const ref = doc(db, "pdfConverterSubscribers", user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const d = snap.data() as { active?: boolean } | undefined;
        setSubscriptionActive(d?.active === true);
      },
      (err) => console.error("[pdf-converter] subscriber snapshot", err),
    );
    return () => unsub();
  }, [authEnabled, user]);

  // Legacy plan (no Firebase Auth configured)
  useEffect(() => {
    if (!authEnabled) {
      setLegacyPaid(loadLegacyPlan() === "paid");
    }
  }, [authEnabled]);

  // Load history when key changes
  useEffect(() => {
    setHistory(loadHistory(historyStorageKey));
  }, [historyStorageKey]);

  // Password reset deep link (?mode=resetPassword&oobCode=...)
  useEffect(() => {
    if (typeof window === "undefined" || !firebaseAuth) return;
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const code = params.get("oobCode");
    if (mode === "resetPassword" && code) {
      setResetOobCode(code);
      verifyPasswordResetCode(firebaseAuth, code)
        .then((email) => setResetEmailPreview(email))
        .catch(() => {
          setAuthMessage("リセットリンクが無効か期限切れです。もう一度お試しください。");
          setResetOobCode(null);
        });
    }
  }, []);

  // Stripe Checkout 成功・キャンセル戻り（Webhook 未到達時は session_id で Firestore を同期）
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!authEnabled || !firebaseAuth) return;

    const params = new URLSearchParams(window.location.search);

    if (params.get("cancelled") === "1") {
      if (!sessionStorage.getItem("pdf_checkout_cancel_toast")) {
        sessionStorage.setItem("pdf_checkout_cancel_toast", "1");
        setAuthMessage("決済は完了していません。また必要になったらアップグレードからお進みください。");
      }
      const next = new URLSearchParams(window.location.search);
      next.delete("cancelled");
      const q = next.toString();
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`,
      );
      return;
    }

    if (params.get("upgraded") !== "1") return;

    const sessionId = params.get("session_id");
    const stripCheckoutParams = () => {
      const next = new URLSearchParams(window.location.search);
      next.delete("upgraded");
      next.delete("session_id");
      const q = next.toString();
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`,
      );
    };

    if (!sessionId) {
      if (!sessionStorage.getItem("pdf_upgrade_no_session_hint")) {
        sessionStorage.setItem("pdf_upgrade_no_session_hint", "1");
        setAuthMessage(
          "このURLには決済セッション情報がありません。Stripe の Webhook（/api/stripe/webhook）が届いていれば数秒で反映されます。反映されない場合は Webhook の設定をご確認ください。",
        );
      }
      stripCheckoutParams();
      return;
    }

    if (!user) {
      if (!sessionStorage.getItem(`pdf_stripe_need_login_${sessionId}`)) {
        sessionStorage.setItem(`pdf_stripe_need_login_${sessionId}`, "1");
        setAuthMessage(
          "決済後の反映には、お支払い時と同じアカウントでログインしてください。",
        );
      }
      return;
    }

    const doneKey = `pdf_stripe_confirm_done_${sessionId}`;
    if (sessionStorage.getItem(doneKey)) {
      stripCheckoutParams();
      return;
    }

    let cancelledReq = false;
    (async () => {
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/stripe/confirm-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ sessionId }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (cancelledReq) return;
        if (res.ok) {
          sessionStorage.setItem(doneKey, "1");
          stripCheckoutParams();
          setAuthMessage("有料プランを反映しました。");
        } else {
          console.error("[pdf-converter] confirm-session", res.status, data);
          setAuthMessage(
            data.error ??
              "決済の確認に失敗しました。Stripe のダッシュボードでお支払いが完了しているか、サーバー環境変数をご確認ください。",
          );
        }
      } catch (e) {
        if (!cancelledReq) {
          console.error(e);
          setAuthMessage(
            "決済の確認通信に失敗しました。しばらくしてからページを再読み込みしてください。",
          );
        }
      }
    })();

    return () => {
      cancelledReq = true;
    };
  }, [authEnabled, user, firebaseAuth]);

  // Stripe 顧客ポータルからの戻り
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscription_portal") !== "1") return;
    setAuthMessage(
      "Stripe の画面から戻りました。解約した場合、無料プランへの反映は Webhook 経由のため数分かかることがあります。",
    );
    const next = new URLSearchParams(window.location.search);
    next.delete("subscription_portal");
    const q = next.toString();
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`,
    );
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming).filter(isImageFile);
      if (arr.length === 0) {
        window.alert(
          "対応形式: JPEG / PNG / WebP / GIF / BMP などの画像ファイルを追加してください。",
        );
        return;
      }
      setFiles((prev) => {
        const combined = [
          ...prev,
          ...arr.map((f) => ({
            id: uid(),
            file: f,
            previewUrl: null,
            status: "idle" as const,
          })),
        ];
        if (combined.length > limit) {
          const planLabel = isPaid ? "有料プラン" : "無料プラン";
          const limitNum = isPaid ? PAID_LIMIT : FREE_LIMIT;
          window.alert(
            `${planLabel}では一度に最大 ${limitNum} ファイルまでです。\n先頭 ${limitNum} ファイルのみ追加しました。`,
          );
          return combined.slice(0, limit);
        }
        return combined;
      });
      arr.forEach((f) => {
        const url = URL.createObjectURL(f);
        setFiles((prev) =>
          prev.map((item) =>
            item.file === f ? { ...item, previewUrl: url } : item,
          ),
        );
      });
    },
    [limit, isPaid],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });
      return [];
    });
    setResultDataUrl(null);
  }, []);

  const convert = useCallback(async () => {
    if (files.length === 0) return;
    setConverting(true);
    setResultDataUrl(null);

    try {
      const imageFiles = files.map((f) => f.file);
      const dataUrl = await imagesToPdfDataUrl(imageFiles);
      const fname =
        files.length === 1
          ? files[0].file.name.replace(/\.[^/.]+$/, "") + ".pdf"
          : "converted.pdf";
      setResultDataUrl(dataUrl);
      setResultFilename(fname);

      if (isPaid) {
        const key = historyKeyRef.current;
        if (key) {
          const entry: HistoryEntry = {
            id: uid(),
            filename: fname,
            fileCount: files.length,
            createdAt: Date.now(),
            pdfDataUrl: dataUrl,
          };
          setHistory((prev) => {
            const next = [entry, ...prev].slice(0, 50);
            saveHistory(key, next);
            return next;
          });
        }
      }
    } catch (err) {
      console.error(err);
      window.alert("変換に失敗しました。別ブラウザでお試しください。");
    } finally {
      setConverting(false);
    }
  }, [files, isPaid]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => setDragOver(false), []);

  const upgradeFlow = useCallback(() => {
    setAuthMessage(null);
    setAuthModalMode(user ? "login" : "login");
    setShowPlanModal(true);
  }, [user]);

  const activatePaidDemo = useCallback(() => {
    localStorage.setItem(PLAN_STORAGE_KEY, "paid");
    setLegacyPaid(true);
    setShowPlanModal(false);
  }, []);

  const openBillingPortal = useCallback(async () => {
    if (!firebaseAuth || !user) {
      setAuthMessage("プランの管理・解約にはログインが必要です。");
      return;
    }
    setAuthMessage(null);
    setPortalLoading(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/stripe/billing-portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok) {
        setAuthMessage(data.error ?? "顧客ポータルを開けませんでした。");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setAuthMessage("顧客ポータルの URL を取得できませんでした。");
    } catch (e) {
      console.error(e);
      setAuthMessage(
        "通信に失敗しました。しばらくしてから再度お試しください。",
      );
    } finally {
      setPortalLoading(false);
    }
  }, [firebaseAuth, user]);

  const downgradeToFree = useCallback(() => {
    if (authEnabled) {
      void openBillingPortal();
      return;
    }
    localStorage.setItem(PLAN_STORAGE_KEY, "free");
    setLegacyPaid(false);
  }, [authEnabled, openBillingPortal]);

  const deleteHistoryEntry = useCallback((id: string) => {
    const key = historyKeyRef.current;
    setHistory((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveHistory(key, next);
      return next;
    });
  }, []);

  const startStripeCheckout = useCallback(async (u: User) => {
    setCheckoutLoading(true);
    setAuthMessage(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: u.uid }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "checkout failed");
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL");
    } catch (e) {
      console.error(e);
      setAuthMessage(
        "決済画面を開けませんでした。Stripe の環境変数を確認するか、しばらくしてからお試しください。",
      );
    } finally {
      setCheckoutLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async () => {
    if (!firebaseAuth) return;
    setAuthBusy(true);
    setAuthMessage(null);
    try {
      if (authPassword !== authPassword2) {
        setAuthMessage("パスワードが一致しません。");
        return;
      }
      if (authPassword.length < 8) {
        setAuthMessage("パスワードは8文字以上にしてください。");
        return;
      }
      await createUserWithEmailAndPassword(
        firebaseAuth,
        authEmail.trim(),
        authPassword,
      );
      // 確認メールは送らない（要件どおり）
      setAuthPassword("");
      setAuthPassword2("");
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setAuthMessage("このメールアドレスは既に登録されています。ログインへ切り替えてください。");
      } else {
        setAuthMessage("登録に失敗しました。メール形式とパスワードをご確認ください。");
      }
    } finally {
      setAuthBusy(false);
    }
  }, [authEmail, authPassword, authPassword2]);

  const handleLogin = useCallback(async () => {
    if (!firebaseAuth) return;
    setAuthBusy(true);
    setAuthMessage(null);
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        authEmail.trim(),
        authPassword,
      );
      setAuthPassword("");
    } catch {
      setAuthMessage("ログインに失敗しました。メールアドレスとパスワードをご確認ください。");
    } finally {
      setAuthBusy(false);
    }
  }, [authEmail, authPassword]);

  const handleForgot = useCallback(async () => {
    if (!firebaseAuth) return;
    setAuthBusy(true);
    setAuthMessage(null);
    try {
      const origin =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
        (typeof window !== "undefined" ? window.location.origin : "");
      await sendPasswordResetEmail(firebaseAuth, authEmail.trim(), {
        url: `${origin}/tools/pdf-converter`,
        handleCodeInApp: false,
      });
      setAuthMessage(
        "パスワード再設定用のメールを送信しました。受信トレイをご確認ください。",
      );
    } catch {
      setAuthMessage(
        "送信に失敗しました。メールアドレスをご確認ください（登録のないアドレスでもエラーに見える場合があります）。",
      );
    } finally {
      setAuthBusy(false);
    }
  }, [authEmail]);

  const handleLogout = useCallback(async () => {
    if (!firebaseAuth) return;
    await signOut(firebaseAuth);
  }, []);

  const handleResetSubmit = useCallback(async () => {
    if (!firebaseAuth || !resetOobCode) return;
    if (resetNewPassword !== resetNewPassword2) {
      window.alert("パスワードが一致しません。");
      return;
    }
    if (resetNewPassword.length < 8) {
      window.alert("パスワードは8文字以上にしてください。");
      return;
    }
    setResetBusy(true);
    try {
      await confirmPasswordReset(firebaseAuth, resetOobCode, resetNewPassword);
      window.alert("パスワードを更新しました。ログインしてください。");
      window.history.replaceState({}, "", "/tools/pdf-converter");
      setResetOobCode(null);
      setResetEmailPreview(null);
      setResetNewPassword("");
      setResetNewPassword2("");
    } catch {
      window.alert("更新に失敗しました。リンクの有効期限をご確認ください。");
    } finally {
      setResetBusy(false);
    }
  }, [resetNewPassword, resetNewPassword2, resetOobCode]);

  if (!authReady) {
    return (
      <div className="pc-shell">
        <p className="pc-auth-wait">読み込み中…</p>
      </div>
    );
  }

  return (
    <div className="pc-shell">
      <header className="pc-hero">
        <p className="pc-hero-label">Tools / ツール</p>
        <h1>無料 PDF 変換ツール</h1>
        <p className="pc-hero-lead">
          画像ファイル（JPEG・PNG・WebP など）をブラウザ上で PDF に変換してダウンロード。
          無料プランでは 1 ファイルずつ変換できます。有料プランでは最大 20
          ファイルを一括変換＆ログイン後に変換履歴を端末内に保存できます。
        </p>
        <p className="pc-privacy">
          <strong>プライバシー：</strong>
          画像の変換はブラウザ内で行い、画像ファイルをサーバーにアップロードしません。
          有料プランはアカウントと決済状態の同期にのみサーバーを使います。
        </p>

        <nav className="pc-seo-links" aria-label="関連ツール">
          <Link href="/tools/pdf-converter" aria-current="page">
            無料 PDF 変換
          </Link>
          <span className="pc-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools/rireki">無料・履歴書をつくる</Link>
          <span className="pc-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools/shokumu-keirekisho">無料・職務経歴書をつくる</Link>
          <span className="pc-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools">すべてのツール</Link>
        </nav>

        {resetOobCode && resetEmailPreview && firebaseAuth ? (
          <div className="pc-reset-banner" role="region" aria-label="パスワード再設定">
            <p className="pc-reset-title">パスワードを再設定</p>
            <p className="pc-reset-email">{resetEmailPreview}</p>
            <label className="pc-auth-label" htmlFor="pc-reset-pw">
              新しいパスワード（8文字以上）
            </label>
            <input
              id="pc-reset-pw"
              type="password"
              className="pc-auth-input"
              value={resetNewPassword}
              onChange={(e) => setResetNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <label className="pc-auth-label" htmlFor="pc-reset-pw2">
              確認
            </label>
            <input
              id="pc-reset-pw2"
              type="password"
              className="pc-auth-input"
              value={resetNewPassword2}
              onChange={(e) => setResetNewPassword2(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="pc-btn-primary"
              disabled={resetBusy}
              onClick={handleResetSubmit}
            >
              {resetBusy ? "更新中…" : "パスワードを更新"}
            </button>
          </div>
        ) : null}

        <div className="pc-plan-row">
          <span className={`pc-plan-badge ${isPaid ? "paid" : ""}`}>
            {isPaid ? "有料プラン（月額 ¥300）" : "無料プラン"}
          </span>
          {authEnabled && user ? (
            <span className="pc-account-email">{user.email}</span>
          ) : null}
          {authEnabled && user ? (
            <button type="button" className="pc-btn-ghost" onClick={handleLogout}>
              ログアウト
            </button>
          ) : null}
          {!isPaid ? (
            <button type="button" className="pc-btn-upgrade" onClick={upgradeFlow}>
              有料プランにアップグレード
            </button>
          ) : (
            <button
              type="button"
              className="pc-btn-ghost"
              onClick={downgradeToFree}
              disabled={authEnabled && portalLoading}
            >
              {authEnabled
                ? portalLoading
                  ? "接続中…"
                  : "プランの管理・解約"
                : "無料プランに戻す"}
            </button>
          )}
        </div>
        {authEnabled && authMessage && !showPlanModal ? (
          <p className="pc-inline-notice" role="status">
            {authMessage}
          </p>
        ) : null}
      </header>

      {isPaid && (
        <div className="pc-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "convert"}
            className={`pc-tab${tab === "convert" ? " active" : ""}`}
            onClick={() => setTab("convert")}
          >
            変換する
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "history"}
            className={`pc-tab${tab === "history" ? " active" : ""}`}
            onClick={() => setTab("history")}
          >
            変換履歴
            {history.length > 0 && (
              <span className="pc-tab-count">{history.length}</span>
            )}
          </button>
        </div>
      )}

      {tab === "convert" && (
        <div className="pc-workspace">
          <div
            className={`pc-dropzone${dragOver ? " drag-over" : ""}${files.length > 0 ? " has-files" : ""}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => files.length === 0 && fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="ファイルをドロップするかクリックして選択"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
          >
            {files.length === 0 ? (
              <div className="pc-dropzone-empty">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="pc-dropzone-title">
                  ここにファイルをドロップ
                  <span>または クリックして選択</span>
                </p>
                <p className="pc-dropzone-hint">
                  対応形式：JPEG / PNG / WebP / GIF / BMP
                  {!isPaid
                    ? "　｜　無料プランは 1 ファイルずつ"
                    : `　｜　有料プランは最大 ${PAID_LIMIT} ファイル一括`}
                </p>
              </div>
            ) : (
              <div className="pc-file-grid">
                {files.map((item) => (
                  <div key={item.id} className="pc-file-card">
                    {item.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="pc-file-thumb"
                      />
                    ) : (
                      <div className="pc-file-thumb pc-file-thumb--placeholder" />
                    )}
                    <div className="pc-file-info">
                      <span className="pc-file-name" title={item.file.name}>
                        {item.file.name}
                      </span>
                      <span className="pc-file-size">
                        {formatSize(item.file.size)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="pc-file-remove"
                      aria-label={`${item.file.name} を削除`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(item.id);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={isPaid}
            className="pc-file-input-hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          <div className="pc-actions">
            {files.length === 0 ? (
              <button
                type="button"
                className="pc-btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                ファイルを選択
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="pc-btn-primary"
                  onClick={convert}
                  disabled={converting}
                >
                  {converting ? "変換中…" : `PDF に変換（${files.length} ファイル）`}
                </button>
                {isPaid && files.length < PAID_LIMIT && (
                  <button
                    type="button"
                    className="pc-btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    ＋ ファイルを追加
                  </button>
                )}
                <button
                  type="button"
                  className="pc-btn-ghost"
                  onClick={clearAll}
                  disabled={converting}
                >
                  クリア
                </button>
              </>
            )}
          </div>

          {resultDataUrl && (
            <div className="pc-result">
              <div className="pc-result-inner">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <p className="pc-result-title">変換完了</p>
                  <p className="pc-result-file">{resultFilename}</p>
                </div>
                <button
                  type="button"
                  className="pc-btn-download"
                  onClick={() => triggerDownload(resultDataUrl, resultFilename)}
                >
                  ダウンロード
                </button>
              </div>
            </div>
          )}

          {!isPaid && (
            <div className="pc-upsell">
              <div className="pc-upsell-inner">
                <p className="pc-upsell-title">有料プランでできること</p>
                <ul className="pc-upsell-list">
                  <li>最大 20 ファイルを一括 PDF 変換</li>
                  <li>アカウントに紐づけて変換履歴を端末内に保存・再ダウンロード</li>
                  <li>複数の画像を 1 つの PDF にまとめる</li>
                </ul>
                <p className="pc-upsell-price">月額 ¥300（税込）— Stripe で安全に決済</p>
                <button type="button" className="pc-btn-upgrade" onClick={upgradeFlow}>
                  アップグレードする
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "history" && isPaid && (
        <div className="pc-history">
          {history.length === 0 ? (
            <p className="pc-history-empty">
              まだ変換履歴がありません。「変換する」タブからファイルをPDFに変換すると、ここに表示されます。
            </p>
          ) : (
            <ul className="pc-history-list">
              {history.map((h) => (
                <li key={h.id} className="pc-history-item">
                  <div className="pc-history-icon" aria-hidden>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="pc-history-info">
                    <p className="pc-history-name">{h.filename}</p>
                    <p className="pc-history-meta">
                      {formatDate(h.createdAt)} · {h.fileCount} ファイル
                    </p>
                  </div>
                  <div className="pc-history-actions">
                    <button
                      type="button"
                      className="pc-btn-secondary"
                      onClick={() => triggerDownload(h.pdfDataUrl, h.filename)}
                    >
                      再ダウンロード
                    </button>
                    <button
                      type="button"
                      className="pc-btn-ghost"
                      onClick={() => deleteHistoryEntry(h.id)}
                      aria-label="削除"
                    >
                      削除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showPlanModal && (
        <div
          className="pc-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPlanModal(false);
          }}
        >
          <div
            className="pc-modal"
            role="dialog"
            aria-modal
            aria-label="有料プランへのアップグレード"
          >
            <button
              type="button"
              className="pc-modal-close"
              onClick={() => setShowPlanModal(false)}
              aria-label="閉じる"
            >
              ✕
            </button>
            <p className="pc-modal-label">Upgrade</p>
            <h2 className="pc-modal-title">有料プラン — 月額 ¥300</h2>
            <ul className="pc-modal-features">
              <li>最大 20 ファイルを一括 PDF 変換</li>
              <li>アカウント登録後、変換履歴を端末内に保存</li>
              <li>新規登録時は確認メールを送りません（パスワード忘れのときのみメール送信）</li>
            </ul>

            {!authEnabled ? (
              <>
                <p className="pc-modal-note">
                  この環境では Firebase 認証が未設定です。本番では
                  NEXT_PUBLIC_FIREBASE_* と Webhook 用のサービスアカウントを設定してください。
                </p>
                {process.env.NODE_ENV === "development" ? (
                  <>
                    <button
                      type="button"
                      className="pc-btn-primary pc-btn-block"
                      onClick={activatePaidDemo}
                    >
                      開発用：有料プランを試す（ローカルのみ）
                    </button>
                  </>
                ) : null}
              </>
            ) : user ? (
              <>
                <p className="pc-modal-note">
                  ログイン中：{user.email}
                  <br />
                  Stripe で決済すると、このアカウントに有料プランが紐づきます。
                </p>
                <button
                  type="button"
                  className="pc-btn-primary pc-btn-block"
                  disabled={checkoutLoading}
                  onClick={() => startStripeCheckout(user)}
                >
                  {checkoutLoading ? "接続中…" : "月額 ¥300 で Stripe 決済へ"}
                </button>
              </>
            ) : (
              <>
                <div className="pc-auth-tabs" role="tablist">
                  <button
                    type="button"
                    className={`pc-auth-tab${authModalMode === "login" ? " active" : ""}`}
                    onClick={() => {
                      setAuthModalMode("login");
                      setAuthMessage(null);
                    }}
                  >
                    ログイン
                  </button>
                  <button
                    type="button"
                    className={`pc-auth-tab${authModalMode === "register" ? " active" : ""}`}
                    onClick={() => {
                      setAuthModalMode("register");
                      setAuthMessage(null);
                    }}
                  >
                    新規登録
                  </button>
                  <button
                    type="button"
                    className={`pc-auth-tab${authModalMode === "forgot" ? " active" : ""}`}
                    onClick={() => {
                      setAuthModalMode("forgot");
                      setAuthMessage(null);
                    }}
                  >
                    パスワード忘れ
                  </button>
                </div>

                <label className="pc-auth-label" htmlFor="pc-auth-email">
                  メールアドレス
                </label>
                <input
                  id="pc-auth-email"
                  type="email"
                  className="pc-auth-input"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  autoComplete="email"
                />

                {authModalMode !== "forgot" ? (
                  <>
                    <label className="pc-auth-label" htmlFor="pc-auth-pw">
                      パスワード（8文字以上）
                    </label>
                    <input
                      id="pc-auth-pw"
                      type="password"
                      className="pc-auth-input"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      autoComplete={
                        authModalMode === "register"
                          ? "new-password"
                          : "current-password"
                      }
                    />
                  </>
                ) : null}

                {authModalMode === "register" ? (
                  <>
                    <label className="pc-auth-label" htmlFor="pc-auth-pw2">
                      パスワード（確認）
                    </label>
                    <input
                      id="pc-auth-pw2"
                      type="password"
                      className="pc-auth-input"
                      value={authPassword2}
                      onChange={(e) => setAuthPassword2(e.target.value)}
                      autoComplete="new-password"
                    />
                  </>
                ) : null}

                {authMessage ? (
                  <p className="pc-auth-message" role="status">
                    {authMessage}
                  </p>
                ) : null}

                {authModalMode === "login" ? (
                  <button
                    type="button"
                    className="pc-btn-primary pc-btn-block"
                    disabled={authBusy}
                    onClick={handleLogin}
                  >
                    {authBusy ? "処理中…" : "ログイン"}
                  </button>
                ) : null}
                {authModalMode === "register" ? (
                  <button
                    type="button"
                    className="pc-btn-primary pc-btn-block"
                    disabled={authBusy}
                    onClick={handleRegister}
                  >
                    {authBusy ? "処理中…" : "登録する（確認メールは送りません）"}
                  </button>
                ) : null}
                {authModalMode === "forgot" ? (
                  <button
                    type="button"
                    className="pc-btn-primary pc-btn-block"
                    disabled={authBusy}
                    onClick={handleForgot}
                  >
                    {authBusy ? "送信中…" : "再設定メールを送信"}
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
      )}

      <section className="pc-seo-article">
        <h2>無料 PDF 変換ツールについて</h2>
        <p>
          ディビゼロの PDF 変換ツールは、画像ファイルをブラウザ上で直接 PDF
          に変換できる無料サービスです。インストール不要で、スマホ・パソコンを問わず使えます。
        </p>
        <h3>大学生・就活生におすすめ</h3>
        <p>
          履歴書・証明書・レポートの PDF
          化に。スキャンした書類の画像をまとめて 1 つの PDF
          にできます。Gmailや就活サイトへの提出にも最適です。
        </p>
        <h3>対応ファイル形式</h3>
        <p>
          JPEG・PNG・WebP・GIF・BMP など主要な画像形式に対応。複数の画像を選択すると、1
          ページずつ並べた PDF を生成します。
        </p>
        <h3>プライバシーについて</h3>
        <p>
          画像の変換はお使いの端末（ブラウザ）内で処理されます。有料プランではアカウント情報と決済状態の同期のためのみサーバーを利用します。
        </p>
      </section>
    </div>
  );
}
