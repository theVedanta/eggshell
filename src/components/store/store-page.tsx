"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/ProductCard";
import InfiniteScrollTrigger from "../InfiniteScrollTrigger";
import type { GSheetProduct } from "@/types/products.type";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React from "react";

export interface StoreCardsViewProps {
  isLoading: boolean;
  searchQuery: string;
  clearFilters: (() => void) | null;
  displayedProducts: GSheetProduct[];
  loadMore: () => void;
  filteredProducts: GSheetProduct[];
  activeFiltersCount: number;
  hasNextPage: boolean;
  prodType: string;
}

const StorePage = React.memo(function StorePage({
  isLoading,
  searchQuery,
  clearFilters,
  displayedProducts,
  loadMore,
  filteredProducts,
  hasNextPage,
  activeFiltersCount,
  prodType,
}: StoreCardsViewProps) {
  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"></div>

      {/* Products Grid */}
      <div className="w-full max-w-full overflow-hidden">
        {displayedProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No products match your search for "${searchQuery}"`
                  : "Try adjusting your filters or search criteria"}
              </p>
              {activeFiltersCount > 0 && clearFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-full overflow-hidden pb-10">
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: true,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]}
              className="w-full select-none"
            >
              <div className="flex relative items-center m-2 mb-5">
                <h2 className="font-bold text-xl text-white/90">{prodType}</h2>
                <div className="md:flex hidden absolute right-5 top-1/2 -translate-y-1/2 gap-2">
                  <CarouselPrevious className="z-10 w-[40px] rounded-sm static translate-y-0" />
                  <CarouselNext className="z-10 w-[40px] rounded-sm static translate-y-0" />
                </div>
              </div>
              <CarouselContent>
                {displayedProducts.map((product, index) => (
                  <CarouselItem
                    key={`${product.id}-${index}`}
                    className="basis-[calc(50%-6px)] sm:basis-[calc(33.333%-8px)] md:basis-[calc(25%-9px)] lg:basis-[calc(25%-9px)] min-w-0 flex-shrink-0"
                  >
                    <div className="w-full h-full">
                      <ProductCard
                        product={product}
                        className="w-full max-w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
                <InfiniteScrollTrigger
                  hasNextPage={hasNextPage}
                  isLoading={isLoading}
                  loadMore={loadMore}
                  filteredCount={filteredProducts.length}
                  displayedCount={displayedProducts.length}
                />
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
});

export default StorePage;
