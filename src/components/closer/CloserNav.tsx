"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ALL_LINKS = [
  { href: "/about", en: "About", ja: "概要" },
  { href: "/services", en: "Services", ja: "サービス" },
  { href: "/tools", en: "Tools", ja: "ツール" },
  { href: "/pricing", en: "Pricing", ja: "料金" },
  { href: "/works", en: "Works", ja: "事例" },
] as const;

export default function CloserNav() {
  const pathname = usePathname() ?? "";
  const isEssayColumn =
    pathname === "/essay" || pathname.startsWith("/essay/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = useMemo(() => {
    if (isEssayColumn) {
      return ALL_LINKS.filter(
        (l) => l.href !== "/pricing" && l.href !== "/works",
      );
    }
    return [...ALL_LINKS];
  }, [isEssayColumn]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navClass = [
    "closer-nav",
    scrolled ? "scrolled" : "",
    isEssayColumn ? "closer-nav--essay-column" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navClass}>
        <Link href="/" className="closer-nav-logo" onClick={() => setOpen(false)}>
          Closer <span>by</span> divizero
        </Link>
        <ul className="closer-nav-links">
          {navLinks.map(({ href, en, ja }) => (
            <li key={href}>
              <Link href={href} className="closer-nav-link-bilingual">
                <span className="closer-nav-link-en">{en}</span>
                <span className="closer-nav-link-sep"> / </span>
                <span className="closer-nav-link-ja">{ja}</span>
              </Link>
            </li>
          ))}
          <li>
            {isEssayColumn ? (
              <Link
                href="/contact?for=partner"
                className="closer-nav-cta"
                onClick={() => setOpen(false)}
              >
                <span className="closer-nav-cta-ja">パートナー募集</span>
                <span className="closer-nav-cta-sep"> / </span>
                <span className="closer-nav-cta-en">Partner</span>
              </Link>
            ) : (
              <Link href="/contact" className="closer-nav-cta">
                <span className="closer-nav-cta-ja">相談する</span>
                <span className="closer-nav-cta-sep"> / </span>
                <span className="closer-nav-cta-en">Contact</span>
              </Link>
            )}
          </li>
        </ul>
        <button
          type="button"
          className="closer-nav-hamburger"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            style={
              open
                ? { transform: "translateY(6px) rotate(45deg)" }
                : undefined
            }
          />
          <span style={open ? { opacity: 0 } : undefined} />
          <span
            style={
              open
                ? { transform: "translateY(-6px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </nav>
      <div
        className={`closer-mobile-nav ${open ? "open" : ""}`}
        id="closer-mobile-nav"
        aria-hidden={!open}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          Top
        </Link>
        {navLinks.map(({ href, en, ja }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {en} / {ja}
          </Link>
        ))}
        {isEssayColumn ? (
          <Link
            href="/contact?for=partner"
            onClick={() => setOpen(false)}
          >
            パートナー募集 / Partner
          </Link>
        ) : (
          <Link href="/contact" onClick={() => setOpen(false)}>
            相談する / Contact
          </Link>
        )}
      </div>
    </>
  );
}
