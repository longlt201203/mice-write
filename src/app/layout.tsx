import type { Metadata } from "next";
import "./globals.css";
import BufferRootLayout from "@/components/BufferRootLayout";

export const metadata: Metadata = {
  title: "Mice Write",
  description: "Sao ma cuu dc nua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><BufferRootLayout>{children}</BufferRootLayout></body>
    </html>
  );
}
