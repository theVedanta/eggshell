import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins, Geist } from "next/font/google";
import { QueryProvider } from "@/query-calls/QueryProvider";

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
      <head>
        <link
          rel="icon"
          href="/assets/favicon/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/assets/favicon/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <meta
          name="description"
          content="EggShell - Buy clothes, shoes, and accessories from Indian homegrown brands. Modern fashion and lifestyle products."
        />
        <meta
          name="keywords"
          content="fashion, lifestyle, Indian brands, homegrown, clothes, shoes, accessories, ecommerce, EggShell, buy online, modern fashion, premium products"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          property="og:title"
          content="EggShell - Modern Fashion & Lifestyle"
        />
        <meta
          property="og:description"
          content="EggShell is your destination for modern fashion, footwear, accessories, and premium lifestyle products from Indian brands."
        />
        <meta
          property="og:image"
          content="/assets/images/eggshell-og-image.png"
        />
        <meta property="og:url" content="https://www.eggshellstore.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EggShell - Modern Fashion & Lifestyle"
        />
        <meta
          name="twitter:description"
          content="EggShell is your destination for modern fashion, footwear, accessories, and premium lifestyle products from Indian brands."
        />
        <meta
          name="twitter:image"
          content="/assets/images/eggshell-twitter-image.png"
        />
        <link rel="canonical" href="https://www.eggshellstore.com" />
      </head>
      <body
        className={`${geist.variable} ${bebas_neue.variable} dark antialiased`}
      >
        <ClerkProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <QueryProvider>{children}</QueryProvider>
          </Suspense>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
