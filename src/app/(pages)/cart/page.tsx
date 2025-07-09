"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/state/useCart";
import { getFeaturedProducts } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const suggestedProducts = getFeaturedProducts().slice(0, 4);

  const subtotal = total;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount + shipping) * 0.08;
  const grandTotal = subtotal - discount + shipping + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="space-y-8">
        {/* Empty Cart */}
        <Card>
          <CardContent className="p-16 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Button size="lg" asChild className="btn-primary-gradient">
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">You Might Like</h2>
              <p className="text-muted-foreground">
                Popular products from our collection
              </p>
            </div>

            <div className="products-grid">
              {suggestedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold heading-gradient">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Button variant="outline" onClick={clearCart}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="py-0">
            <CardContent className="p-0">
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="cart-item p-6">
                    {/* Product Image */}
                    <div className="w-20 h-20 relative overflow-hidden rounded-lg bg-muted flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder-product.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-semibold hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>

                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Color: {item.color}</span>
                        <span>Size: {item.size}</span>
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ₹{item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle>Promo Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="pt-0 mt-0"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </Button>
              </div>
              {promoApplied && (
                <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    SAVE10 Applied - 10% off
                  </Badge>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Try code &quot;SAVE10&quot; for 10% off your order
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (SAVE10)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Free
                      </Badge>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Add ₹{(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full btn-primary-gradient"
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>

              {/* Security Features */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>30-day return guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Free shipping over $50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recently Viewed or Recommended */}
      {suggestedProducts.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Complete Your Look</h2>
            <p className="text-muted-foreground">
              Products that go well with items in your cart
            </p>
          </div>

          <div className="products-grid">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
