'use client';

import Link from 'next/link';
import { Star, ArrowRight, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product-card';
import { brands, getProductsByBrand, Product } from '@/lib/db';

export default function BrandsPage() {
  const featuredBrands = brands.filter(brand => brand.featured);
  const allBrands = brands.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4">
          <Star className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold heading-gradient">Our Brands</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover premium brands that define modern fashion and lifestyle. Each brand represents
          quality, innovation, and timeless style.
        </p>
      </div>

      {/* Featured Brands */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured Brands</h2>
          <p className="text-muted-foreground">
            Our most popular and trusted brand partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBrands.map((brand) => {
            const brandProducts = getProductsByBrand(brand.name);
            const featuredProducts = brandProducts.filter(p => p.featured).slice(0, 3);

            return (
              <Card key={brand.id} className="group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {brand.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {brand.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {brandProducts.length} products
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      Featured
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {brand.description}
                  </p>

                  {/* Featured Products Preview */}
                  {featuredProducts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Featured Products</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {featuredProducts.map((product) => (
                          <div key={product.id} className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1">
                              <div className="text-xs font-medium truncate">
                                {product.name}
                              </div>
                              <div className="text-xs">
                                ${product.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button asChild className="w-full">
                    <Link href={`/brands/${brand.id}`}>
                      Explore {brand.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* All Brands */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">All Brands</h2>
          <p className="text-muted-foreground">
            Browse our complete collection of partner brands
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allBrands.map((brand) => {
            const brandProducts = getProductsByBrand(brand.name);
            const averageRating = brandProducts.length > 0
              ? brandProducts.reduce((sum, p) => sum + p.rating, 0) / brandProducts.length
              : 0;

            return (
              <Link key={brand.id} href={`/brands/${brand.id}`}>
                <Card className="group transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary mb-3">
                        {brand.name.charAt(0)}
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {brand.name}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {averageRating.toFixed(1)}
                        </span>
                      </div>

                      <p className="text-muted-foreground">
                        {brandProducts.length} product{brandProducts.length !== 1 ? 's' : ''}
                      </p>

                      {brand.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                      {brand.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Brand Stats */}
      <section className="bg-muted/50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Why Choose Our Brands?</h2>
          <p className="text-muted-foreground">
            We partner with the best to bring you quality and style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {brands.length}+
            </div>
            <div className="text-sm text-muted-foreground">
              Premium Brands
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {brands.reduce((sum, brand) => sum + getProductsByBrand(brand.name).length, 0)}+
            </div>
            <div className="text-sm text-muted-foreground">
              Quality Products
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              4.8★
            </div>
            <div className="text-sm text-muted-foreground">
              Average Rating
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
          Be the first to know about new brand partnerships, exclusive collections,
          and special collaborations.
        </p>

        <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
          Subscribe to Updates
        </Button>
      </section>
    </div>
  );
}
