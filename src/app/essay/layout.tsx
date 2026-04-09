import CloserShell from "@/components/closer/CloserShell";

export default function EssaySectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CloserShell>{children}</CloserShell>;
}
