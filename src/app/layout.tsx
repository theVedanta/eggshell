import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
// import { ClerkProvider } from "@clerk/nextjs";
import { Poppins, Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const bebas_neue = Poppins({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Eggshell Store - Modern Fashion & Lifestyle",
  description:
    "Your destination for modern fashion, footwear, accessories, and premium lifestyle products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${bebas_neue.variable} dark antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  );
}
