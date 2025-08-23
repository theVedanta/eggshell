"use client";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  landmark: string;
  type: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    landmark: "",
  });

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelectChange(name: string, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleAddAddress() {
    setAddresses([
      ...addresses,
      {
        ...form,
        id: `address-${addresses.length + 1}`,
        type: "shipping",
        isDefault: addresses.length === 0,
      },
    ]);
    setForm({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      landmark: "",
    });
    setDialogOpen(false);
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="border-0 shadow-none bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="text-lg">
                {user?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
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
                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start shopping to see your order history here
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
                    Manage your shipping addresses for faster checkout
                  </CardDescription>
                </div>
                <Button size="sm" onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    No saved addresses
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Address
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border rounded p-4 text-left">
                      <div className="font-semibold flex items-center gap-2">
                        {addr.firstName} {addr.lastName}
                        {addr.isDefault && (
                          <span className="text-xs text-primary ml-2 px-2 py-0.5 rounded bg-primary/10">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm mt-1">
                        {addr.street}
                        {addr.landmark && (
                          <span className="text-muted-foreground">
                            , {addr.landmark}
                          </span>
                        )}
                        <br />
                        {addr.city}, {addr.state} - {addr.zipCode}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          India
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Phone: {addr.phone}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <Button variant="link" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
                <Button variant="link" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button variant="link" className="w-full justify-start">
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
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/help">Help Center</Link>
                </Button>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/returns">Returns & Refunds</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <CardDescription className="mt-1 text-xs text-muted-foreground">
              We currently deliver only in{" "}
              <span className="font-semibold text-primary">India</span>.
            </CardDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddAddress();
            }}
            className="grid gap-4"
          >
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="street">Street Name</Label>
              <Input
                id="street"
                name="street"
                placeholder="e.g. 123 MG Road"
                value={form.street}
                onChange={handleInput}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="landmark">
                Landmark{" "}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="landmark"
                name="landmark"
                placeholder="Near City Mall, Opposite SBI ATM"
                value={form.landmark}
                onChange={handleInput}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="state">State</Label>
                <Select
                  value={form.state}
                  onValueChange={(val) => handleSelectChange("state", val)}
                  required
                >
                  <SelectTrigger id="state" className="w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32 space-y-1">
                <Label htmlFor="zipCode">Pincode</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="e.g. 400001"
                  value={form.zipCode}
                  onChange={handleInput}
                  required
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleInput}
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Address</Button>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
