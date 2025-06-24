"use client";

import Link from "next/link";
import { brands } from "@/lib/db";
import Newsletter from "@/components/Newsletter";

export default function BrandsPage() {
    // Repeat the brands array 5 times to simulate a large list
    const repeatedBrands = Array(5)
        .fill(null)
        .flatMap(() => brands)
        .map((brand, idx) => ({
            ...brand,
            // To avoid duplicate keys, append the index
            _uniqueId: `${brand.id}-${idx}`,
        }));

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold mb-2">All Brands</h1>
                <p className="text-muted-foreground">
                    Browse our complete collection of partner brands.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {repeatedBrands.map((brand) => (
                    <Link
                        key={brand._uniqueId}
                        href={`/brands/${brand.id}`}
                        className="block"
                    >
                        <div className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition bg-background">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-lg font-bold text-primary mb-2">
                                {brand.name.charAt(0)}
                            </div>
                            <div className="text-center">
                                <div className="font-medium text-sm">
                                    {brand.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {brand.description}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-12">
                <Newsletter />
            </div>
        </div>
    );
}
