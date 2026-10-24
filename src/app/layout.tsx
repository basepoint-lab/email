import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basepoint Mail | Workspace & Email Operations",
  description:
    "Unified Basepoint Mail workspace, corporate communications, and transactional delivery operations.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
