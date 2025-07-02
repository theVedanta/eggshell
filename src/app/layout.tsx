import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Lato } from "next/font/google";

const lato = Lato({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "700"],
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
                <body className={`${lato.className} dark antialiased`}>
                    <Layout>{children}</Layout>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
