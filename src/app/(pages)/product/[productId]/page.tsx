"use client";

import { useState, useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RefreshCw,
  ArrowLeft,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/ProductCard";
import { brands } from "@/lib/db";
import { useCart } from "@/state/useCart";
import { toast } from "sonner";
import { useGetProductById } from "@/query-calls/product-query";
import { useGetRelatedProducts } from "@/query-calls/product-query";
import { useGetAllOrdersByUserId } from "@/query-calls/order-query";
import { useAuth } from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const { productId } = params;
  const { data: product, error, isLoading } = useGetProductById(productId);
  const { data: relatedProducts } = useGetRelatedProducts(productId);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { userId, isSignedIn } = useAuth();
  const { addToCart, isLoading: cartLoading } = useCart(userId || undefined);

  // Fetch user's orders for this product
  const {
    data: userOrders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersByUserId(userId || undefined);
  // Filter orders for this product
  const productOrders = Array.isArray(userOrders)
    ? userOrders.filter(
        (order) =>
          Array.isArray(order.items) &&
          order.items.some((item) => item.productId === productId)
      )
    : [];

  // Set default selections using useEffect (must be called before any early returns)
  useEffect(() => {
    if (product && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0].productColor);
    }
    if (product && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedColor, selectedSize]);

  // Reset selected image when color changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedColor]);

  // Handle loading and error states AFTER all hooks are called
  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        {/* Back Button Skeleton */}
        <div className="mb-4">
          <div className="h-10 w-24 bg-gray-500 animate-pulse rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images Skeleton */}
          <div>
            <div className="space-y-4 sticky top-3">
              {/* Main Image Skeleton */}
              <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-200/40 animate-pulse"></div>

              {/* Thumbnail Images Skeleton */}
              <div className="flex gap-2 overflow-x-auto">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200/40 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-6">
            {/* Brand & Title Skeleton */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-6 w-24 bg-gray-500 animate-pulse rounded mb-2"></div>
                <div className="h-8 w-3/4 bg-gray-500 animate-pulse rounded"></div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <div className="h-10 w-10 bg-gray-500 animate-pulse rounded-full"></div>
                <div className="h-10 w-10 bg-gray-500 animate-pulse rounded-full"></div>
              </div>
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 bg-gray-500 animate-pulse rounded"
                  ></div>
                ))}
                <div className="h-4 w-8 bg-gray-500 animate-pulse rounded ml-1"></div>
              </div>
              <div className="h-4 w-20 bg-gray-500 animate-pulse rounded"></div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-24 bg-gray-500 animate-pulse rounded"></div>
              <div className="h-6 w-20 bg-gray-500 animate-pulse rounded"></div>
              <div className="h-6 w-16 bg-gray-500 animate-pulse rounded"></div>
            </div>

            {/* Stock Status Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 animate-pulse rounded-full"></div>
              <div className="h-4 w-16 bg-gray-500 animate-pulse rounded"></div>
            </div>

            <div className="w-full h-px bg-gray-500"></div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-500 animate-pulse rounded"></div>
              <div className="h-4 w-5/6 bg-gray-500 animate-pulse rounded"></div>
              <div className="h-4 w-4/5 bg-gray-500 animate-pulse rounded"></div>
            </div>

            {/* Color Selection Skeleton */}
            <div>
              <div className="h-5 w-20 bg-gray-500 animate-pulse rounded mb-3"></div>
              <div className="flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-20 bg-gray-500 animate-pulse rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Size Selection Skeleton */}
            <div>
              <div className="h-5 w-16 bg-gray-500 animate-pulse rounded mb-3"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-12 bg-gray-500 animate-pulse rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart Skeleton */}
            <div className="space-y-4">
              <div>
                <div className="h-5 w-16 bg-gray-500 animate-pulse rounded mb-3"></div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-500 animate-pulse rounded"></div>
                  <div className="h-6 w-8 bg-gray-500 animate-pulse rounded"></div>
                  <div className="h-10 w-10 bg-gray-500 animate-pulse rounded"></div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-gray-500 animate-pulse rounded"></div>
                <div className="h-12 w-12 bg-gray-500 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Features Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-500 animate-pulse rounded"></div>
                  <div className="h-4 w-24 bg-gray-500 animate-pulse rounded"></div>
                </div>
              ))}
            </div>

            {/* Tags Skeleton */}
            <div>
              <div className="h-5 w-12 bg-gray-500 animate-pulse rounded mb-3"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-16 bg-gray-500 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const brand = brands.find((b) => b.name === product.brand);

  const handleAddToCart = async () => {
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (!isSignedIn) {
      toast.error("Please sign in to add items to your cart");
      return router.push("/sign-in");
    }

    try {
      // Get the selected color object
      const selectedColorObj = product.colors.find(
        (color) => color.productColor === selectedColor
      );

      // Use the first image (index 0) of the selected color
      const selectedImageUrl =
        selectedColorObj?.productImages[0] || "/placeholder-product.jpg";

      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        selectedColor: selectedColor || "Default",
        selectedImage: selectedImageUrl,
        brand: product.brand,
        size: selectedSize || "Default",
        quantity,
      });

      // toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="space-y-4 p-2">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="space-y-4 sticky top-3">
            <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
              <Image
                src={
                  product.colors.find(
                    (img) => img.productColor === selectedColor
                  )?.productImages[selectedImage] || "/placeholder-product.jpg"
                }
                fill
                alt={product.name}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />

              {/* Image Badges */}
              {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discountPercentage && (
                    <Badge variant="destructive" className="bg-red-500">
                      -{discountPercentage}%
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="bg-gray-500 text-white">
                      Out of Stock
                    </Badge>
                  )}
                </div> */}
            </div>

            {/* Thumbnail Images */}
            {product.colors.map((info) => {
              if (info.productColor === selectedColor) {
                return (
                  <div
                    key={info.productColor}
                    className="flex gap-2 overflow-x-auto"
                  >
                    {info.productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder-product.jpg"}
                          alt={`${product.name}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Brand & Title & Wishlist/Share */}
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/brands/${brand?.id}`}
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                {product.brand}
              </Link>
              <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button
                size="icon"
                variant="secondary"
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleWishlist}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product?.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
            {discountPercentage && (
              <Badge variant="destructive" className="text-sm">
                Save {discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-red-600 font-medium">
                  Out of Stock
                </span>
              </>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div>
              <Label className="text-base font-medium mb-3 block">
                Color: {selectedColor}
              </Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div
                    key={color.productColor}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={color.productColor}
                      id={`color-${color.productColor}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`color-${color.productColor}`}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                        selectedColor === color.productColor
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-border"
                        style={{
                          backgroundColor:
                            color.productColor.toLowerCase() === "white"
                              ? "#ffffff"
                              : color.productColor.toLowerCase() === "black"
                                ? "#000000"
                                : color.productColor.toLowerCase() === "gray"
                                  ? "#6b7280"
                                  : color.productColor.toLowerCase() === "navy"
                                    ? "#1e3a8a"
                                    : color.productColor.toLowerCase() ===
                                        "brown"
                                      ? "#92400e"
                                      : color.productColor.toLowerCase() ===
                                          "green"
                                        ? "#059669"
                                        : color.productColor.toLowerCase() ===
                                            "blue"
                                          ? "#2563eb"
                                          : color.productColor.toLowerCase() ===
                                              "red"
                                            ? "#dc2626"
                                            : "#6b7280",
                        }}
                      />
                      {color.productColor}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div>
              <Label className="text-base font-medium mb-3 block">
                Size: {selectedSize}
              </Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors min-w-[3rem] text-center flex items-center justify-center ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium mb-3 block">
                Quantity
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 btn-primary-gradient"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock || cartLoading}
              >
                {cartLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={handleWishlist}>
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 text-primary" />
              <span>30-day returns</span>
            </div>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div>
              <Label className="text-base font-medium mb-3 block">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {product.tags.map((tag) => (
                        <li key={tag} className="capitalize">
                          {tag} quality
                        </li>
                      ))}
                      <li>Premium materials</li>
                      <li>Modern design</li>
                      <li>Versatile styling</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Product Details</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Brand:</dt>
                          <dd className="font-medium">{product.brand}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Category:</dt>
                          <dd className="font-medium capitalize">
                            {product.category}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Type:</dt>
                          <dd className="font-medium capitalize">
                            {product.subcategory.replace("-", " ")}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">SKU:</dt>
                          <dd className="font-medium">
                            {product.id.toUpperCase()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Available Options</h4>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground mb-1">
                            Colors:
                          </dt>
                          <dd className="font-medium">
                            {product.colors
                              .map((c) => c.productColor)
                              .join(", ")}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground mb-1">Sizes:</dt>
                          <dd className="font-medium">
                            {product.sizes.join(", ")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <span>Customer Reviews</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-normal">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">⭐</div>
                    <p className="text-muted-foreground">
                      Reviews feature coming soon! This product has{" "}
                      {product.reviewCount} reviews with an average rating of{" "}
                      {product.rating} stars.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* User's Orders for this Product */}
      <section>
        <h2 className="text-xl font-bold mb-2">Your Orders for this Product</h2>
        {ordersLoading ? (
          <div className="text-muted-foreground">Loading your orders...</div>
        ) : ordersError ? (
          <div className="text-red-500">Failed to load your orders.</div>
        ) : productOrders.length === 0 ? (
          <div className="text-muted-foreground">
            You have not ordered this product yet.
          </div>
        ) : (
          <div className="space-y-4">
            {productOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 bg-muted/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <span className="font-semibold">Order ID:</span> {order.id}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {order.items?.find((item) => item.productId === productId)
                    ?.quantity || 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Products */}
      {Array.isArray(relatedProducts) && relatedProducts.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">You Might Also Like</h2>
            <p className="text-muted-foreground">
              Similar products from our collection
            </p>
          </div>

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
                <h2 className="font-bold text-xl text-white/90">
                  Suggested Products
                </h2>
                <div className="md:flex hidden absolute right-10 top-1/2 -translate-y-1/2 gap-2">
                  <CarouselPrevious className="z-10 w-[40px] rounded-sm static translate-y-0" />
                  <CarouselNext className="z-10 w-[40px] rounded-sm static translate-y-0" />
                </div>
              </div>
              <CarouselContent>
                {relatedProducts.map((product, index) => (
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
                {/* <InfiniteScrollTrigger
                  hasNextPage={hasNextPage}
                  isLoading={isLoading}
                  loadMore={loadMore}
                  filteredCount={filteredProducts.length}
                  displayedCount={displayedProducts.length}
                /> */}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      )}
    </div>
  );
}
