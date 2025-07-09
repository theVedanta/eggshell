"use client";

import { brands } from "@/lib/db";
import Newsletter from "@/components/Newsletter";
import BrandCard from "@/components/BrandCard";

export default function BrandsPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">All Brands</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of partner brands.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <BrandCard key={i} brand={brand} />
        ))}
      </div>
      <div className="mt-12">
        <Newsletter />
      </div>
    </div>
  );
}
