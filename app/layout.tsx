import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "VyIQ — AI Media Intelligence Studio | Nord Storia",
  description:
    "Cold stories, told bright. VyIQ: AI Media Intelligence Studio — create, manage, monitor and optimize campaigns in one place. Thuộc Công ty Tâm Việt Quang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="preload" href="/fonts/SyneViet-800.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SyneViet-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
