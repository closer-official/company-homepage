import Link from "next/link";

type BilingualTextProps = {
  en: string;
  ja: string;
  className?: string;
};

export function BilingualInline({ en, ja, className = "" }: BilingualTextProps) {
  return (
    <span className={className}>
      <span className="closer-bilingual-en">{en}</span>
      <span className="closer-bilingual-sep"> / </span>
      <span className="closer-bilingual-ja">{ja}</span>
    </span>
  );
}

export function BilingualLink({
  href,
  en,
  ja,
  className = "",
}: BilingualTextProps & { href: string }) {
  return (
    <Link href={href} className={className}>
      <BilingualInline en={en} ja={ja} />
    </Link>
  );
}
