"use client";

import Link from "next/link";
import {
    CheckCircle,
    Package,
    Truck,
    Clock,
    ArrowRight,
    Download,
    Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmationPage() {
    // Mock order data - in a real app, this would come from the order ID
    const orderData = {
        id: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        total: 299.97,
        items: [
            {
                name: "Essential Crew Neck Tee",
                price: 29.99,
                quantity: 2,
                color: "Black",
                size: "M",
            },
            {
                name: "Minimalist Low-Top Sneakers",
                price: 149.99,
                quantity: 1,
                color: "White",
                size: "10",
            },
            {
                name: "Leather Messenger Bag",
                price: 89.99,
                quantity: 1,
                color: "Brown",
                size: "One Size",
            },
        ],
        shipping: {
            name: "John Doe",
            address: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
        },
        estimatedDelivery: "3-5 business days",
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Success Header */}
            <Card className="text-center bg-emerald-950">
                <CardContent className="p-8">
                    <div className="mb-6">
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-emerald-100 mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-lg text-emerald-200">
                            Thank you for your purchase. Your order has been
                            successfully placed.
                        </p>
                    </div>

                    <div className="p-4 mb-6">
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Package className="w-4 h-4 text-emerald-300" />
                                <span className="font-medium text-emerald-100">
                                    Order #{orderData.id}
                                </span>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="h-4 bg-emerald-800"
                            />
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-emerald-300" />
                                <span className="text-emerald-100">
                                    {orderData.date}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            className="bg-emerald-700 hover:bg-emerald-800 text-white"
                        >
                            <Link href="/orders">View Order Details</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-emerald-700 text-emerald-100 hover:bg-emerald-900"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                        </Button>
                        <Button
                            variant="outline"
                            className="border-emerald-700 text-emerald-100 hover:bg-emerald-900"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Order
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Order Status & Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">
                                    Order Confirmed
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Your order has been received and is being
                                    processed
                                </div>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800">
                                Complete
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Package className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Processing</div>
                                <div className="text-sm text-muted-foreground">
                                    We&apos;re preparing your items for shipment
                                </div>
                            </div>
                            <Badge variant="secondary">In Progress</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Truck className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-muted-foreground">
                                    Shipped
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Your order is on its way to you
                                </div>
                            </div>
                            <Badge variant="outline">Pending</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-muted-foreground">
                                    Delivered
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Estimated delivery:{" "}
                                    {orderData.estimatedDelivery}
                                </div>
                            </div>
                            <Badge variant="outline">Pending</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {orderData.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.color} • {item.size} •
                                                Qty: {item.quantity}
                                            </div>
                                        </div>
                                        <div className="font-semibold">
                                            ₹$
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm space-y-1">
                                <div className="font-medium">
                                    {orderData.shipping.name}
                                </div>
                                <div>{orderData.shipping.address}</div>
                                <div>
                                    {orderData.shipping.city},{" "}
                                    {orderData.shipping.state}{" "}
                                    {orderData.shipping.zipCode}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Order Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        ₹{(orderData.total - 16).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹9.99</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>₹6.01</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-base">
                                    <span>Total</span>
                                    <span>₹{orderData.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Next Steps */}
            <Card>
                <CardHeader>
                    <CardTitle>What&apos;s Next?</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold mb-2">
                                Track Your Order
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                You&apos;ll receive a tracking number via email once
                                your order ships.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                                <Truck className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="font-semibold mb-2">
                                Delivery Updates
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                We&apos;ll send you updates about your delivery
                                status.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Easy Returns</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                30-day hassle-free returns if you&apos;re not
                                completely satisfied.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="text-center">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Continue Shopping</h2>
                    <p className="text-muted-foreground">
                        Discover more amazing products from our collection
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="outline" size="lg">
                            <Link href="/shop">
                                Browse All Products
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/category/apparel">Shop Apparel</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/brands">Explore Brands</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Help Section */}
            <Card className="bg-muted/50">
                <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Have questions about your order? Our customer service
                        team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button variant="outline" size="sm">
                            Contact Support
                        </Button>
                        <Button variant="outline" size="sm">
                            Order FAQ
                        </Button>
                        <Button variant="outline" size="sm">
                            Return Policy
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
