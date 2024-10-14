import Link from "next/link";
import { LogoIcon } from "../_components/Icons";
import TopBar from "../_components/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
