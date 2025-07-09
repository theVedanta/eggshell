"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, categories, brands, ad_products } from "@/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Newsletter from "@/components/Newsletter";
import BrandCard from "@/components/BrandCard";
import { useProductFilters } from "@/hooks/use-product-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const featuredProductsData = getFeaturedProducts();

export default function HomePage() {
  const { currentPage, setCurrentPage, paginatedProducts, totalPages } =
    useProductFilters({
      initialProducts: featuredProductsData,
    });

  return (
    <div className="space-y-16">
      {/* Hero Section with Product Carousel */}
      <section className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="h-96">
            {ad_products.map((product) => (
              <CarouselItem key={product.id} className="basis-full">
                <Link href={`/product/${product.id}`}>
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-xl h-96">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-300 group-hover:brightness-75"
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <CarouselPrevious className="left-4" /> */}
          {/* <CarouselNext className="right-4" /> */}
        </Carousel>
      </section>

      {/* Featured Products */}
      <section>
        <div className="products-grid">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
            />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>

      {/* Categories */}
      {/* <section>
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Shop by Category
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Explore our carefully curated categories
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.id}`}
                        >
                            <Card className="group overflow-hidden transition-all !p-0 duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors duration-300" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                                                    {category.id ===
                                                        "apparel" && (
                                                        <span className="text-2xl">
                                                            👕
                                                        </span>
                                                    )}
                                                    {category.id ===
                                                        "footwear" && (
                                                        <span className="text-2xl">
                                                            👟
                                                        </span>
                                                    )}
                                                    {category.id ===
                                                        "accessories" && (
                                                        <span className="text-2xl">
                                                            ⌚
                                                        </span>
                                                    )}
                                                    {category.id ===
                                                        "jewellery" && (
                                                        <span className="text-2xl">
                                                            💎
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                    {category.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section> */}

      {/* Brands */}
      <section className="rounded-xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Brands</h2>
          <p className="text-muted-foreground mt-2">
            Trusted by fashion enthusiasts worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...brands].map((brand, i) => (
            <BrandCard key={i} brand={brand} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/brands">
              View All Brands
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
