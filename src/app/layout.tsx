import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// PrimeReact 초기 설정
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./_components/QueryProvider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "codingtext",
  description: "codingtext",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <PrimeReactProvider>
          <QueryProvider>{children}</QueryProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
