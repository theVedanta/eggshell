import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/state/useCart";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetFooter,
} from "@/components/ui/sheet";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ShoppingCart } from "lucide-react";

export function CartSheet({ children }: { children: React.ReactNode }) {
    const { items, total, itemCount } = useCart();
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<any>(null);
    const [open, setOpen] = useState(false);

    // Order summary calculations (mimic cart page)
    const subtotal = total;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const discount = 0; // No promo in sheet
    const tax = (subtotal - discount + shipping) * 0.08;
    const grandTotal = subtotal - discount + shipping + tax;

    // Handle carousel change
    const handleApi = (api: any) => {
        setCarouselApi(api);
        if (api) {
            setActiveIndex(api.selectedScrollSnap());
            api.on("select", () => {
                setActiveIndex(api.selectedScrollSnap());
            });
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {children}
            <SheetContent
                side="right"
                className="p-0 max-w-sm w-full flex flex-col"
            >
                <SheetHeader className="border-b p-4 flex flex-row items-center justify-between">
                    <span className="font-semibold text-lg">
                        Your Cart ({itemCount})
                    </span>
                </SheetHeader>
                <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                            <span className="text-5xl">🛒</span>
                            <div className="font-semibold text-lg">
                                Your cart is empty
                            </div>
                            <Button
                                asChild
                                className="btn-primary-gradient w-full"
                            >
                                <Link href="/shop">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Carousel of product images */}
                            <Carousel
                                opts={{
                                    loop: true,
                                    align: "center",
                                }}
                                setApi={handleApi}
                                className="w-full"
                            >
                                <CarouselContent className="ml-0">
                                    {items.map((item, idx) => (
                                        <CarouselItem
                                            key={item.id}
                                            className="flex justify-center items-center h-60 basis-3/5 transition-opacity duration-300"
                                            style={{
                                                opacity:
                                                    idx === activeIndex
                                                        ? 1
                                                        : 0.4,
                                            }}
                                        >
                                            <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-muted">
                                                <Image
                                                    src={
                                                        item.image ||
                                                        "/placeholder-product.jpg"
                                                    }
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="192px"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            {/* Price of active product */}
                            {items[activeIndex] && (
                                <div className="text-center mt-2">
                                    <span className="font-semibold text-lg">
                                        ₹
                                        {(
                                            items[activeIndex].price *
                                            items[activeIndex].quantity
                                        ).toFixed(2)}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-2">
                                        ({items[activeIndex].quantity} × ₹
                                        {items[activeIndex].price.toFixed(2)})
                                    </span>
                                </div>
                            )}
                            {/* Product details */}
                            {items[activeIndex] && (
                                <div className="text-center text-sm mt-1">
                                    <div className="font-medium line-clamp-2">
                                        {items[activeIndex].name}
                                    </div>
                                    <div className="flex justify-center gap-3 mt-1 text-muted-foreground">
                                        <span>
                                            Color: {items[activeIndex].color}
                                        </span>
                                        <span>
                                            Size: {items[activeIndex].size}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <Separator className="my-2" />
                            {/* Order summary */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
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
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>₹{grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <SheetFooter className="border-t p-4 flex flex-col gap-2">
                    <Button
                        asChild
                        variant="secondary"
                        className="w-full"
                        size="lg"
                        disabled={items.length === 0}
                        onClick={() => setOpen(false)}
                    >
                        <Link href="/cart">
                            <ShoppingCart /> View Cart
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="w-full btn-primary-gradient"
                        size="lg"
                        disabled={items.length === 0}
                        onClick={() => setOpen(false)}
                    >
                        <Link href="/checkout">
                            <Check /> Checkout
                        </Link>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
