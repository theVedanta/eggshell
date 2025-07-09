"use client";

import { orders } from "@/lib/db";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function OrdersPage() {
    return (
        <div className="max-w-3xl mx-auto py-8 space-y-8">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <h2 className="text-lg font-semibold mb-2">
                            No orders found
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            You haven&apos;t placed any orders yet.
                        </p>
                        <Button asChild>
                            <a href="/shop">Browse Products</a>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-lg">
                                    Order #{order.id}
                                </CardTitle>
                                <CardDescription className="text-xs mt-1">
                                    Placed on{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}{" "}
                                    | Status:{" "}
                                    <Badge variant="outline">
                                        {order.status}
                                    </Badge>
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">
                                    Total: ${order.total.toFixed(2)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {order.items.length} item
                                    {order.items.length > 1 ? "s" : ""}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 py-4"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="rounded border"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Color: {item.color} | Size:{" "}
                                            {item.size}
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        x{item.quantity}
                                    </div>
                                    <div className="text-sm">
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
