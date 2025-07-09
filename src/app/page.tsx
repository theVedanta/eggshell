"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                E
              </span>
            </div>
            <span className="font-bold text-xl">Eggshell</span>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <Button asChild variant="ghost" size="sm">
                  <SignInButton />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName/>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold heading-gradient mb-6">
            What would you like today?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the latest products and exclusive deals—shop your favorites
            or explore something new. Enjoy a seamless shopping experience
            tailored just for you.
          </p>
        </div>

        {/* Categories Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Button
                  variant="outline"
                  className="w-full h-16 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link href="/store">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Shopping
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
