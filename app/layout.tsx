import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
