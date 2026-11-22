import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VyIQ × Nord Storia AI Studio",
  description:
    "Step inside an AI-powered creative studio and turn your look into a live campaign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
