import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
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
        <ClerkProvider>
            <html lang="en">
                <body className={`${montserrat.variable} dark antialiased`}>
                    <Layout>{children}</Layout>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
