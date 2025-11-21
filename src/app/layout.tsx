import { ReactQueryProvider } from "@/contexts";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "치즈뷰어",
  description: "치지직컵 대회 정보 및 모의 드래프트 팬사이트입니다.",
  icons: { icon: "/icons/chzzviewer-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${pretendard.variable} antialiased`}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
