import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextHoverEffect } from "@/components/text-hover-effect";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen">
      <h1 className="bg-clip-text mb-16 text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-9xl md:text-9xl lg:text-[12rem] font-sans py-2 md:py-10 relative z-50 font-bold tracking-tight">
        <TextHoverEffect text="404" automatic />
      </h1>
      <div className="relative flex items-center justify-center flex-col mt-8">
        <p className="max-w-xl mx-auto text-base md:text-lg text-neutral-700 dark:text-neutral-400 text-center mb-4">
          Oops! The page you are looking for does not exist.
          <br />
          It might have been moved or deleted.
        </p>
        <Button
          variant="outline"
          asChild
          className="mt-2 px-6 z-10 py-2 cursor-pointer text-base font-semibold rounded-xl bg-white/90 dark:bg-black/90 text-black dark:text-white border border-black/10 dark:border-white/10 shadow hover:shadow-lg transition-all"
          aria-label="Go back to Home"
        >
          <Link href="/">Go back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
