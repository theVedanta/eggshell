"use client";
import { useGetAllOrders } from "@/query-calls/order-query";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Package, User, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

function formatCurrency(value?: number) {
  const n = typeof value === "number" ? value : 0;
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function UserPage() {
  const params = useParams<{ user: string }>();
  const { user } = params;
  const { data, isLoading } = useGetAllOrders(user);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto grid pt-[55px]">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
            <span className="ml-4 text-lg text-gray-300">
              Loading orders...
            </span>
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <div className="py-16">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <Package className="mx-auto h-14 w-14 text-gray-500 mb-4" />
                <p className="text-gray-300 text-lg">No orders found</p>
                <p className="text-sm text-gray-500 mt-2">
                  Try another user or create an order.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div>
          {data?.map((order) => (
            <div
              key={order.id}
              className="bg-white/2 border border-gray-800 backdrop-blur-sm hover:shadow-lg transition-shadow"
            >
              <div className="py-5 px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-900/60 text-emerald-300 border-emerald-700">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4 space-y-6">
                {/* New layout: items on the LEFT (span 2), all info on the RIGHT (span 1) */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* LEFT: Items (larger column) */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="h-5 w-5 text-violet-400" />
                      <h4 className="text-lg font-semibold text-white">
                        Items
                      </h4>
                    </div>

                    <ScrollArea className="border h-[365px]">
                      <div className="divide-y divide-gray-800 p-3">
                        {order.items?.map((item, i) => (
                          <div
                            key={i}
                            className="p-4 flex items-center gap-4 border"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-[90px] w-[90px] aspect-square flex items-center justify-center text-gray-400">
                                <Image
                                  src={item.selectedImage}
                                  alt={item.name}
                                  width={90}
                                  height={90}
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col justify-center gap-1">
                                <div className="text-white/80 font-medium text-sm">
                                  Name:{" "}
                                  <span className="text-white">
                                    {item.name}
                                  </span>
                                </div>
                                <div className="text-white/80 font-medium text-sm">
                                  Color:{" "}
                                  <span className="text-white">
                                    {item.selectedColor}
                                  </span>
                                </div>
                                <div className="text-white/80 font-medium text-sm">
                                  Size:{" "}
                                  <span className="text-white">
                                    {item.size}
                                  </span>
                                </div>
                                <div className="text-sm text-white/80">
                                  Quantity:{" "}
                                  <span className="text-white">
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="text-white font-semibold">
                                {formatCurrency(item.price)}
                              </div>
                              <div className="text-sm text-gray-400">
                                {formatCurrency(
                                  (item.price ?? 0) * (item.quantity ?? 1)
                                )}
                              </div>
                            </div>
                          </div>
                        )) ?? <div className="p-4 text-gray-400">No items</div>}
                      </div>
                    </ScrollArea>
                    <div className="p-4 flex items-center gap-2">
                      <div className="text-sm text-gray-400">Items total:</div>
                      <div className="font-semibold text-green-400/80">
                        {formatCurrency(
                          order.items?.reduce(
                            (s: number, it: any) =>
                              s +
                              Number(it.price ?? 0) * Number(it.quantity ?? 1),
                            0
                          ) ?? 0
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Info (narrow column), right-aligned values */}
                  <aside className="md:col-span-1 flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <User className="h-5 w-5 text-sky-400" />
                        <h4 className="text-lg font-semibold text-white">
                          Customer
                        </h4>
                      </div>
                      <div className="bg-gray-900/60 p-4 rounded-md border border-gray-800 text-sm space-y-2 text-right">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name</span>
                          <span className="text-white">
                            {order.firstName ?? "-"} {order.lastName ?? ""}
                          </span>
                        </div>
                        <Separator className="bg-gray-800" />
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email</span>
                          <span className="text-white">
                            {order.email ?? "-"}
                          </span>
                        </div>
                        <Separator className="bg-gray-800" />
                        <div className="flex justify-between">
                          <span className="text-gray-400">Phone</span>
                          <span className="text-white">
                            {order.phone ?? "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                        <h4 className="text-lg font-semibold text-white">
                          Shipping
                        </h4>
                      </div>
                      <div className="bg-gray-900/60 p-4 rounded-md border border-gray-800 text-sm text-right">
                        <div className="text-gray-300">
                          <p>{order.address ?? "-"}</p>
                          <p>
                            {order.city ?? ""}
                            {order.city ? ", " : ""}
                            {order.state ?? ""} {order.zipCode ?? ""}
                          </p>
                          <p>{order.country ?? "-"}</p>
                        </div>
                      </div>
                    </div>

                    {order.paymentMethod && (
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <CreditCard className="h-5 w-5 text-yellow-400" />
                          <h4 className="text-lg font-semibold text-white">
                            Payment
                          </h4>
                        </div>
                        <div className="bg-gray-900/60 p-4 rounded-md border border-gray-800 text-sm flex items-center justify-between">
                          <span className="text-gray-300">Method</span>
                          <span className="text-white font-medium">
                            {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                    )}
                  </aside>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Order ID:{" "}
                  <span className="text-gray-200 font-medium">{order.id}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Total</div>
                  <div className="text-xl font-bold text-green-400">
                    {/* {formatCurrency(
                      order.total ??
                        order.items?.reduce(
                          (s: number, it: any) => s + Number(it.price ?? 0) * Number(it.quantity ?? 1),
                          0
                        ) ??
                        0
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
