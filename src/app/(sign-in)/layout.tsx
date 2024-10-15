import Link from "next/link";
import { LogoIcon } from "../_components/Icons";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-400 min-h-screen flex flex-col items-center justify-between py-20">
        <Link href="/" scroll={false}>
          <LogoIcon />
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <Link href="/policy" className="text-xs text-body">
            개인정보처리방침
          </Link>
          <div className="w-[1px] h-[10px] bg-border-2" />
          <Link href="/terms" className="text-xs text-body">
            약관
          </Link>
        </div>
      </div>
    </div>
  );
}
