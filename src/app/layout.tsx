// @ts-expect-error globals.css --- IGNORE ---
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { APP_URL } from "@/lib/globals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pici",
  description: "The platform for photographers. Manage shoots, invoices, and your website—all in one place.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: "Pici",
    description: "The platform for photographers. Manage shoots, invoices, and your website—all in one place.",
    url: APP_URL,
    siteName: "pici.sh",
    images: [
      {
        url: "/pici-logo.svg",
        width: 240,
        height: 80,
        alt: "pici.sh logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
