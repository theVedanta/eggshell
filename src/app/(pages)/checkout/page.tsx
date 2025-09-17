"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  Truck,
  Lock,
  ArrowLeft,
  Check,
  ChevronRight,
  MapPin,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/state/useCart";
import { toast } from "sonner";
import { useCreateOrder } from "@/query-calls/order-query";
import { useAuth } from "@clerk/nextjs";
import { allIndianStates } from "@/lib/all-indian-states";
import { validatePhone } from "@/lib/utils";

// Razorpay: use API route instead of direct import
// import { createRazorpayOrder } from "@/lib/razorpay";

export interface CheckoutForm {
  userId: string;
  // Shipping Information
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;

  // Billing Information
  billingDifferent: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingAddress2: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;

  // Preferences
  saveInfo: boolean;
  newsletter: boolean;
  smsUpdates: boolean;
}

const initialForm: CheckoutForm = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "IN",
  phone: "",
  billingDifferent: false,
  billingFirstName: "",
  billingLastName: "",
  billingAddress: "",
  billingAddress2: "",
  billingCity: "",
  billingState: "",
  billingZipCode: "",
  billingCountry: "IN",
  saveInfo: false,
  newsletter: false,
  smsUpdates: false,
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

// Add proper TypeScript interface for Razorpay response
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function CheckoutPage() {
  const user = useAuth();
  const { items, total: cartTotal, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const razorpayOrderIdRef = useRef<string | null>(null);

  const createOrderMutation = useCreateOrder();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-16 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You need items in your cart to proceed to checkout.
            </p>
            <Button size="lg" asChild className="btn-primary-gradient">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal + shipping) * 0.08;
  const total = subtotal + shipping + tax;

  const updateForm = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Contact & Shipping
        return !!(
          form.email &&
          form.firstName &&
          form.lastName &&
          form.address &&
          form.city &&
          form.state &&
          form.zipCode &&
          form.phone
        );
      case 2: // Payment (no payment info needed, just proceed)
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    const isValid = validatePhone(form.phone);
    if (validateStep(currentStep) && isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      if (!isValid) {
        toast.error("Phone number is invalid");
      } else {
        toast.error("Please fill in all required fields");
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Razorpay Checkout Handler using API route
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setRazorpayLoading(true);

    try {
      if (!user || !user.userId)
        return toast.error("You must be signed in to place an order.");

      // 1. Create Razorpay order via API route
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amountInRupees: Math.round(total),
          receiptId: `receipt_${Date.now()}`,
          notes: {
            email: form.email,
            name: `${form.firstName} ${form.lastName}`,
            userId: user.userId,
          },
        }),
      });

      if (!orderRes.ok) {
        setIsProcessing(false);
        setRazorpayLoading(false);
        const err = await orderRes.json();
        toast.error(err.error || "Failed to create payment order.");
        return;
      }

      const order = await orderRes.json();
      razorpayOrderIdRef.current = order.id;

      // 2. Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount, // in paise
        currency: order.currency,
        name: "Your Store",
        description: "Order Payment",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          // 4. Verify payment signature via API route
          try {
            // Validate response has required fields
            if (
              !response.razorpay_payment_id ||
              !response.razorpay_order_id ||
              !response.razorpay_signature
            ) {
              toast.error("Invalid payment response. Please try again.");
              setIsProcessing(false);
              setRazorpayLoading(false);
              return;
            }

            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyJson = await verifyRes.json();
            if (!verifyRes.ok || !verifyJson.valid) {
              toast.error(
                "Payment verification failed. Please contact support."
              );
              setIsProcessing(false);
              setRazorpayLoading(false);
              return;
            }

            // 5. On payment success and verification, create order in your DB
            const orderData = {
              ...form,
              userId: user.userId!,
              items,
              total,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            await createOrderMutation.mutateAsync(orderData);
            clearCart();
            toast.success("Order placed successfully!");
            router.push("/order-confirmation");
          } catch (error) {
            console.error("Order creation error:", error);
            toast.error("Order creation failed. Please contact support.");
            setIsProcessing(false);
            setRazorpayLoading(false);
          }
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          address: form.address,
        },
        theme: {
          color: "#6366f1",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setRazorpayLoading(false);
            toast.info("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
      setRazorpayLoading(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Shipping",
      description: "Contact and shipping information",
    },
    {
      number: 2,
      title: "Payment",
      description: "Pay securely with Razorpay",
    },
    { number: 3, title: "Review", description: "Review and confirm order" },
  ];

  return (
    <div className="space-y-8 checkout-page">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-4xl font-bold heading-gradient">Checkout</h1>
          <p className="text-muted-foreground mt-1">
            Complete your purchase securely
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Contact & Shipping */}
          {currentStep === 1 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) =>
                          updateForm("firstName", e.target.value)
                        }
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={(e) => updateForm("address", e.target.value)}
                      placeholder="Address"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input
                      id="address2"
                      value={form.address2}
                      onChange={(e) => updateForm("address2", e.target.value)}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        placeholder="City Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={form.state}
                        onValueChange={(value) => updateForm("state", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {allIndianStates.map((state) => (
                            <SelectItem key={state.code} value={state.code}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={form.zipCode}
                        onChange={(e) => updateForm("zipCode", e.target.value)}
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        updateForm("phone", e.target.value);
                      }}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Step 2: Payment (Razorpay only) */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://razorpay.com/favicon.ico"
                      alt="Razorpay"
                      className="w-6 h-6"
                    />
                    <span className="font-medium">
                      Pay securely with Razorpay
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    All major cards, UPI, wallets, and netbanking supported.
                  </div>
                </div>
                <Button
                  className="btn-primary-gradient w-full mt-4"
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing || razorpayLoading}
                >
                  {isProcessing || razorpayLoading
                    ? "Redirecting to Razorpay..."
                    : `Pay ₹${total.toFixed(2)} with Razorpay`}
                </Button>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  You will be redirected to Razorpay to complete your payment.
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-4">Items ({itemCount})</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={
                              item.selectedImage || "/placeholder-product.jpg"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.selectedColor} • {item.size} • Qty:{" "}
                            {item.quantity}
                          </div>
                        </div>
                        <div className="font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Shipping Info */}
                <div>
                  <h3 className="font-semibold mb-2">Shipping to:</h3>
                  <div className="text-sm text-muted-foreground">
                    <div>
                      {form.firstName} {form.lastName}
                    </div>
                    <div>{form.address}</div>
                    {form.address2 && <div>{form.address2}</div>}
                    <div>
                      {form.city}, {form.state} {form.zipCode}
                    </div>
                    <div>{form.phone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isProcessing}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="btn-primary-gradient"
                disabled={isProcessing}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleRazorpayPayment}
                disabled={isProcessing || razorpayLoading}
                className="btn-primary-gradient"
              >
                {isProcessing || razorpayLoading
                  ? "Redirecting to Razorpay..."
                  : `Pay ₹${total.toFixed(2)} with Razorpay`}
              </Button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
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

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="pt-4 space-y-2 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3 text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>30-day return guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
