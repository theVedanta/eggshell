"use client";

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
import { useGetAllOrdersByUserId } from "@/query-calls/order-query";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function OrdersPage() {
  const { userId, isLoaded } = useAuth();
  const {
    data: orders = [],
    error,
    isLoading,
  } = useGetAllOrdersByUserId(userId || undefined);

  // Show loading while auth is loading or orders are loading
  if (!isLoaded || isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p>Loading orders...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!userId) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold mb-2">Please sign in</h2>
            <p className="text-muted-foreground mb-4">
              You need to be signed in to view your orders.
            </p>
            <Button asChild>
              <a href="/sign-in">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-red-500">
              Error loading orders: {(error as Error).message}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-lg font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-4">
              You haven&apos;t placed any orders yet.
            </p>
            <Button asChild>
              <Link href="/#products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">
                  Order #{order.id?.slice(-8)}
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  Placed on{" "}
                  {new Date(order?.createdAt ?? "").toLocaleDateString("en-IN")}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ₹{((order as any).total || 0).toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {order?.items?.length ?? 0} item
                  {(order?.items?.length ?? 0) > 1 ? "s" : ""}
                </div>
              </div>
            </CardHeader>
            <CardContent className="divide-y">
              {order?.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative w-16 h-16 rounded border overflow-hidden bg-muted">
                    <Image
                      src={item.selectedImage || "/placeholder-product.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium line-clamp-2">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Color: {item?.selectedColor} | Size: {item.size}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">×{item.quantity}</div>
                  <div className="text-sm font-medium">
                    ₹{item.price.toFixed(2)}
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
