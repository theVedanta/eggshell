"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/db";
import Link from "next/link";
import SearchBar from "@/components/sidebar/search_bar";
import { ChevronDown } from "lucide-react";
import StorePage from "@/components/store/store-page";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Scroll to store section on button click smoothly
  const storePg = useRef<HTMLDivElement | null>(null);
  const HandleClick = () => {
    window.scrollTo({
      behavior: "smooth",
      top: storePg.current?.offsetTop,
    });
  };

  useEffect(() => {
    if (searchParams && pathname === "/") {
      const searchParam = searchParams.get("search");
      if (searchParam) {
        HandleClick();
      }
    }
  }, [searchParams, pathname]);
  return (
    <>
      <section className="w-full h-screen flex flex-col items-center justify-center">
        <Image
          src="/assets/logo/1x.png"
          alt="Eggshell Store Logo"
          className="w-32 h-32 object-contain"
          width={128}
          height={128}
        />

        <div className="text-center">
          {/* Embossed Text Section */}
          <h1 className="text-4xl md:text-5xl font-bold heading-gradient">
            what would you like today?
          </h1>
          <p className="text-lg py-7 text-muted-foreground max-w-2xl mx-auto">
            Discover the latest products and exclusive deals—shop your favorites
            or explore something new. Enjoy a seamless shopping experience
            tailored just for you.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Button variant="outline" size="sm">
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
        <SearchBar />
        <Button variant="ghost" className="mt-10" onClick={() => HandleClick()}>
          <ChevronDown size={96} />
        </Button>
      </section>
      <div ref={storePg} className="py-2" id="products">
        <StorePage />
      </div>
    </>
  );
}
