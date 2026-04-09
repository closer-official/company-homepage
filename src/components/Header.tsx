'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/services', en: 'Services', ja: 'サービス一覧・仕事依頼' },
  { href: '/about', en: 'About', ja: '想い' },
  { href: '/company', en: 'Company', ja: '会社概要' },
  { href: '/partners', en: 'Partners', ja: 'パートナー募集' },
  { href: '/contact', en: 'Contact', ja: 'お問い合わせ' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
          isHome
            ? 'border-white/15 bg-transparent'
            : 'border-[var(--border)]/80 bg-[var(--bg-base)]/95 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
          <Link
            href="/"
            className={`font-heading text-lg font-semibold tracking-tight transition-colors ${
              isHome ? 'text-[#f5f4f1]' : 'text-[var(--text)]'
            }`}
          >
            <span className="max-[380px]:text-base">Tadanosuke Closer</span>
          </Link>
          <nav
            className={`hidden items-center gap-10 text-sm ${
              isHome
                ? 'text-[#e0ddd8] [&_a]:hover:text-white'
                : 'md:flex text-[var(--text-muted)] [&_a]:hover:text-[var(--text)]'
            }`}
          >
            {NAV.map(({ href, en, ja }) => (
              <Link key={href} href={href} className="whitespace-nowrap">
                {en}<span className="opacity-60"> / </span>{ja}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition ${
                isHome
                  ? 'bg-white text-[var(--text)] hover:bg-[#f2f0eb]'
                  : 'md:inline-block bg-[var(--terracotta)] text-[#f5f4f1] hover:bg-[var(--terracotta-soft)]'
              }`}
              href="/contact"
            >
              お問い合わせ
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border ${
                isHome ? 'border-white/30' : 'border-[var(--border)]'
              } ${isHome ? '' : 'md:hidden'}`}
              aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            >
              <span
                className={`block h-0.5 w-5 transition-transform duration-200 ${
                  isHome ? 'bg-white' : 'bg-[var(--text)]'
                } ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 transition-opacity duration-200 ${
                  isHome ? 'bg-white' : 'bg-[var(--text)]'
                } ${mobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 transition-transform duration-200 ${
                  isHome ? 'bg-white' : 'bg-[var(--text)]'
                } ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>
      {/* ホームはPCでもメニューを折りたたみ表示 */}
      <div
        className={`fixed left-0 right-0 top-[72px] z-40 border-b border-[var(--border)] bg-[var(--bg-base)] ${
          isHome ? '' : 'md:hidden'
        } ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-5xl flex-col px-5 py-5 sm:px-8">
          {NAV.map(({ href, en, ja }) => (
            <Link
              key={href}
              href={href}
              className="py-3 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="block font-medium">{en}</span>
              <span className="block text-xs opacity-90">{ja}</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-3 rounded-full bg-[var(--terracotta)] py-3 text-center text-sm font-medium text-[#f5f4f1]"
            onClick={() => setMobileMenuOpen(false)}
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </>
  );
}
