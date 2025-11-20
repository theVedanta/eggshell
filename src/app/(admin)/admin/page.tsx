"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useGetAllOrders } from "@/query-calls/order-query";
import { useUser } from "@clerk/nextjs";
import ShimmerText from "@/components/shimmer-text";
import { API_URL } from "@/lib/env";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// all admin email addresses
const adminEmails = [
  "developersilent101@gmail.com",
  "vedanta1412@gmail.com",
  "anavgupta05@gmail.com",
];

export default function AdminDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { data: orders, isLoading } = useGetAllOrders();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-white text-lg">
          <ShimmerText text="EGGSHELL" />
        </div>
      </div>
    );
  }
  const ReValidate = async () => {
    await fetch(API_URL + "/products/revalidate", {
      method: "GET",
      cache: "reload",
    });
    toast.success("Revalidated Redis Cache");
    // Invalidate all relevant queries from /src/query-calls/*
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    // ...add more keys as needed for your app
    // Or, to invalidate everything (use with caution):
    // queryClient.invalidateQueries();
  };

  if (
    isLoaded &&
    isSignedIn &&
    adminEmails.includes(user?.emailAddresses[0].emailAddress as string)
  ) {
    return (
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            <h1 className="text-white text-2xl font-bold">All Orders</h1>
            <p className="text-gray-400 text-sm mt-1">
              Welcome {user?.firstName || user?.username || "Admin"}! Manage and
              view all user orders, statuses, and details.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size={"sm"}
              className="bg-stone-800/60 border border-stone-700 rounded-lg hover:bg-stone-700/80 transition-colors"
            >
              <RefreshCcw className="text-white h-4 w-4 mr-2" />
              <span className="text-white text-sm">Refresh</span>
            </Button>

            <Button
              onClick={() => ReValidate()}
              size={"sm"}
              className="bg-stone-800/60 border border-stone-700 rounded-lg hover:bg-stone-700/80 transition-colors"
            >
              <RefreshCcw className="text-white h-4 w-4 mr-2" />
              <span className="text-white text-sm">ReValidate Redis Cache</span>
            </Button>
            <Avatar className="h-10 w-10 border border-stone-600">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="text-white font-medium bg-stone-700">
                {user?.firstName?.charAt(0) || user?.username?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Table Container - Full Height */}
        <div className="h-[calc(100vh-140px)] overflow-hidden border border-stone-700 rounded-xl bg-stone-900/40 backdrop-blur-sm">
          <ScrollArea className="h-full w-full">
            {!orders || orders?.length === 0 ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-2">No orders found.</p>
                  <p className="text-gray-600 text-sm">
                    Orders will appear here when customers place them.
                  </p>
                </div>
              </div>
            ) : (
              <Table className="w-full">
                <TableHeader className="sticky top-0 bg-stone-800/90 backdrop-blur-sm border-b border-stone-700 z-10">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-gray-200 font-semibold text-base py-4 px-6">
                      User
                    </TableHead>
                    <TableHead className="text-gray-200 font-semibold text-center">
                      Phone
                    </TableHead>
                    <TableHead className="text-gray-200 font-semibold text-center">
                      Payment
                    </TableHead>
                    <TableHead className="text-gray-200 font-semibold text-center">
                      Address
                    </TableHead>
                    <TableHead className="text-gray-200 font-semibold text-center">
                      Country
                    </TableHead>
                    <TableHead className="text-gray-200 font-semibold text-center">
                      Zip Code
                    </TableHead>
                    <TableHead className="text-gray-200 font-semibold text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-stone-800/40 border-stone-700/50 transition-colors"
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-11 w-11 border border-stone-600">
                            <AvatarFallback className="text-white font-medium bg-stone-700 text-sm">
                              {(user.firstName || "U")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-white text-sm truncate">
                              {user.firstName || "Unknown User"}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 truncate">
                              {user.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm text-gray-300">
                          {user.phone || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm text-gray-300 capitalize">
                          {user.paymentMethod || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div
                          className="text-sm text-gray-300 truncate px-2"
                          title={user.address}
                        >
                          {user.address || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm text-gray-300 uppercase">
                          {user.country || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm text-gray-300">
                          {user.zipCode || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size={"sm"}
                          className="bg-stone-700/60 border border-stone-600 rounded-lg hover:bg-stone-600/80 transition-colors"
                        >
                          <span className="text-white text-xs">View</span>
                          <ArrowUpRight className="text-white h-3 w-3 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-white text-lg">
          You do not have permission to access this page.
        </div>
      </div>
    );
  }
}
