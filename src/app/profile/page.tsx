"use client";

import { UserProfile } from "@clerk/nextjs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Package,
    MapPin,
    CreditCard,
    Settings,
    ShoppingBag,
    Plus,
    Eye,
    Edit,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <Card className="border-0 shadow-none bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="text-lg">
                                VS
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">My Account</h1>
                            <p className="text-muted-foreground">
                                Manage your profile, orders, and preferences
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Recent Orders
                                    </CardTitle>
                                    <CardDescription>
                                        Your latest purchases and their status
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/orders">View All</Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">
                                    No orders yet
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Start shopping to see your order history
                                    here
                                </p>
                                <Button asChild>
                                    <Link href="/shop">Browse Products</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Saved Addresses */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Saved Addresses
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your shipping addresses for
                                        faster checkout
                                    </CardDescription>
                                </div>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Address
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                <p className="text-muted-foreground mb-4">
                                    No saved addresses
                                </p>
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Address
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Methods */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Payment Methods
                                    </CardTitle>
                                    <CardDescription>
                                        Securely store your payment information
                                    </CardDescription>
                                </div>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Payment
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                <p className="text-muted-foreground mb-4">
                                    No saved payment methods
                                </p>
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Payment Method
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Account Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Account Settings
                            </CardTitle>
                            <CardDescription>
                                Manage your account preferences and security
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Profile Settings
                                </Button>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Privacy & Security
                                </Button>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                >
                                    <Package className="h-4 w-4 mr-2" />
                                    Order Preferences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help & Support */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/help">Help Center</Link>
                                </Button>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/contact">Contact Support</Link>
                                </Button>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/returns">
                                        Returns & Refunds
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
