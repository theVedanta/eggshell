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

export default function OrdersPage() {
  const user = useAuth();
  const {
    data: orders,
    error,
    isLoading,
  } = useGetAllOrdersByUserId(user?.userId as string);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <p>Loading orders...</p>
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
            <p className="text-red-500">Error loading orders</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log("Orders:", orders);
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-4">
              You haven&apos;t placed any orders yet.
            </p>
            <Button asChild>
              <a href="/shop">Browse Products</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        orders?.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <CardDescription className="text-xs mt-1">
                  Placed on{" "}
                  {new Date(order?.createdAt ?? "").toLocaleDateString()} |
                  {/* Status: <Badge variant="outline">{order.status}</Badge> */}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="font-semibold"></div>
                <div className="text-xs text-muted-foreground">
                  {order?.items?.length ?? 0} item
                  {(order?.items?.length ?? 0) > 1 ? "s" : ""}
                </div>
              </div>
            </CardHeader>
            <CardContent className="divide-y">
              {order?.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <Image
                    src={item.selectedImage}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded border"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Color: {item?.selectedColor} | Size: {item.size}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">x{item.quantity}</div>
                  <div className="text-sm">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
