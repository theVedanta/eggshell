"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "@/components/sidebar/search_bar";
import { ChevronDown } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import { useGetAllProductsByCategory } from "@/query-calls/product-query";
import StoreCardsView from "@/components/store/store-cards-view";

const categories = [
  {
    id: "footwear",
    name: "Footwear",
  },
  {
    id: "apparel",
    name: "Apparel",
  },
  {
    id: "accessories",
    name: "Accessories",
  },
];

export default function HomePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setOpenMobile } = useSidebar();
  const {
    FootwearProducts,
    isFootwearLoading,
    ApparelProducts,
    isApparelLoading,
    AccessoriesProducts,
    isAccessoriesLoading,
  } = useGetAllProductsByCategory();
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
        setOpenMobile(false);
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
              <Button variant="outline" size="sm" className="">
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
      <div ref={storePg} className="py-2 overflow-clip w-full" id="products">
        {!ApparelProducts || !FootwearProducts || !AccessoriesProducts ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            {/* Loading Text */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Loading Products
              </h3>
              <p className="text-muted-foreground animate-pulse">
                Fetching the latest collection for you...
              </p>
            </div>

            {/* Loading Progress Dots */}
            <div className="flex space-x-2 mt-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        ) : (
          <StoreCardsView
            isFootwearLoading={isFootwearLoading}
            isApparelLoading={isApparelLoading}
            isAccessoriesLoading={isAccessoriesLoading}
            FootwearProducts={FootwearProducts}
            ApparelProducts={ApparelProducts}
            AccessoriesProducts={AccessoriesProducts}
          />
        )}
      </div>
    </>
  );
}
