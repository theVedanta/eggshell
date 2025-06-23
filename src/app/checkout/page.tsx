"use client";

import { useState } from "react";
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
    User,
    Mail,
    Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface CheckoutForm {
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

    // Payment Information
    paymentMethod: "card" | "paypal" | "apple_pay";
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;

    // Preferences
    saveInfo: boolean;
    newsletter: boolean;
    smsUpdates: boolean;
}

const initialForm: CheckoutForm = {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    billingDifferent: false,
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingAddress2: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "US",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveInfo: false,
    newsletter: false,
    smsUpdates: false,
};

export default function CheckoutPage() {
    const { state, clearCart } = useCart();
    const router = useRouter();
    const [form, setForm] = useState<CheckoutForm>(initialForm);
    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if cart is empty
    if (state.items.length === 0) {
        return (
            <div className="space-y-8">
                <Card>
                    <CardContent className="p-16 text-center">
                        <div className="text-8xl mb-6">🛒</div>
                        <h1 className="text-3xl font-bold mb-4">
                            Your cart is empty
                        </h1>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            You need items in your cart to proceed to checkout.
                        </p>
                        <Button
                            size="lg"
                            asChild
                            className="btn-primary-gradient"
                        >
                            <Link href="/shop">Start Shopping</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const subtotal = state.total;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = (subtotal + shipping) * 0.08;
    const total = subtotal + shipping + tax;

    const updateForm = (field: keyof CheckoutForm, value: any) => {
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
            case 2: // Payment
                if (form.paymentMethod === "card") {
                    return !!(
                        form.cardNumber &&
                        form.expiryDate &&
                        form.cvv &&
                        form.nameOnCard
                    );
                }
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(2)) {
            toast.error("Please complete all required fields");
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            clearCart();
            toast.success("Order placed successfully!");
            router.push("/order-confirmation");
        } catch (error) {
            toast.error("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
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
            description: "Payment method and billing",
        },
        { number: 3, title: "Review", description: "Review and confirm order" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                    <Link href="/cart">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                    </Link>
                </Button>
                <div>
                    <h1 className="text-4xl font-bold heading-gradient">
                        Checkout
                    </h1>
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
                                    <div className="font-medium text-sm">
                                        {step.title}
                                    </div>
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
                                        <Label htmlFor="email">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={form.email}
                                            onChange={(e) =>
                                                updateForm(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="newsletter"
                                            checked={form.newsletter}
                                            onCheckedChange={(checked) =>
                                                updateForm(
                                                    "newsletter",
                                                    checked
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="newsletter"
                                            className="text-sm"
                                        >
                                            Subscribe to our newsletter for
                                            deals and updates
                                        </Label>
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
                                            <Label htmlFor="firstName">
                                                First Name *
                                            </Label>
                                            <Input
                                                id="firstName"
                                                value={form.firstName}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "firstName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">
                                                Last Name *
                                            </Label>
                                            <Input
                                                id="lastName"
                                                value={form.lastName}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "lastName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="address">
                                            Address *
                                        </Label>
                                        <Input
                                            id="address"
                                            value={form.address}
                                            onChange={(e) =>
                                                updateForm(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="123 Main Street"
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
                                            onChange={(e) =>
                                                updateForm(
                                                    "address2",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Apt 4B"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="city">City *</Label>
                                            <Input
                                                id="city"
                                                value={form.city}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "city",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New York"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">
                                                State *
                                            </Label>
                                            <Select
                                                value={form.state}
                                                onValueChange={(value) =>
                                                    updateForm("state", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select state" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="AL">
                                                        Alabama
                                                    </SelectItem>
                                                    <SelectItem value="CA">
                                                        California
                                                    </SelectItem>
                                                    <SelectItem value="FL">
                                                        Florida
                                                    </SelectItem>
                                                    <SelectItem value="NY">
                                                        New York
                                                    </SelectItem>
                                                    <SelectItem value="TX">
                                                        Texas
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="zipCode">
                                                ZIP Code *
                                            </Label>
                                            <Input
                                                id="zipCode"
                                                value={form.zipCode}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "zipCode",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="10001"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">
                                            Phone Number *
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) =>
                                                updateForm(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="(555) 123-4567"
                                            required
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Step 2: Payment */}
                    {currentStep === 2 && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Payment Method
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup
                                        value={form.paymentMethod}
                                        onValueChange={(value) =>
                                            updateForm(
                                                "paymentMethod",
                                                value as any
                                            )
                                        }
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                            <RadioGroupItem
                                                value="card"
                                                id="card"
                                            />
                                            <Label
                                                htmlFor="card"
                                                className="flex-1 cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="h-4 w-4" />
                                                        <span>
                                                            Credit or Debit Card
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                                            V
                                                        </div>
                                                        <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                                            M
                                                        </div>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                                            <RadioGroupItem
                                                value="paypal"
                                                id="paypal"
                                                disabled
                                            />
                                            <Label
                                                htmlFor="paypal"
                                                className="flex-1 cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                                                        <span>PayPal</span>
                                                    </div>
                                                    <Badge variant="secondary">
                                                        Coming Soon
                                                    </Badge>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                                            <RadioGroupItem
                                                value="apple_pay"
                                                id="apple_pay"
                                                disabled
                                            />
                                            <Label
                                                htmlFor="apple_pay"
                                                className="flex-1 cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-black rounded" />
                                                        <span>Apple Pay</span>
                                                    </div>
                                                    <Badge variant="secondary">
                                                        Coming Soon
                                                    </Badge>
                                                </div>
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {form.paymentMethod === "card" && (
                                        <div className="mt-6 space-y-4">
                                            <div>
                                                <Label htmlFor="cardNumber">
                                                    Card Number *
                                                </Label>
                                                <Input
                                                    id="cardNumber"
                                                    value={form.cardNumber}
                                                    onChange={(e) =>
                                                        updateForm(
                                                            "cardNumber",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="nameOnCard">
                                                    Name on Card *
                                                </Label>
                                                <Input
                                                    id="nameOnCard"
                                                    value={form.nameOnCard}
                                                    onChange={(e) =>
                                                        updateForm(
                                                            "nameOnCard",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="expiryDate">
                                                        Expiry Date *
                                                    </Label>
                                                    <Input
                                                        id="expiryDate"
                                                        value={form.expiryDate}
                                                        onChange={(e) =>
                                                            updateForm(
                                                                "expiryDate",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="MM/YY"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvv">
                                                        CVV *
                                                    </Label>
                                                    <Input
                                                        id="cvv"
                                                        value={form.cvv}
                                                        onChange={(e) =>
                                                            updateForm(
                                                                "cvv",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="123"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Billing Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Checkbox
                                            id="billingDifferent"
                                            checked={form.billingDifferent}
                                            onCheckedChange={(checked) =>
                                                updateForm(
                                                    "billingDifferent",
                                                    checked
                                                )
                                            }
                                        />
                                        <Label htmlFor="billingDifferent">
                                            Billing address is different from
                                            shipping address
                                        </Label>
                                    </div>

                                    {form.billingDifferent && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="billingFirstName">
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="billingFirstName"
                                                        value={
                                                            form.billingFirstName
                                                        }
                                                        onChange={(e) =>
                                                            updateForm(
                                                                "billingFirstName",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="John"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="billingLastName">
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="billingLastName"
                                                        value={
                                                            form.billingLastName
                                                        }
                                                        onChange={(e) =>
                                                            updateForm(
                                                                "billingLastName",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Doe"
                                                    />
                                                </div>
                                            </div>
                                            {/* Add more billing fields as needed */}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </>
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
                                    <h3 className="font-semibold mb-4">
                                        Items ({state.itemCount})
                                    </h3>
                                    <div className="space-y-4">
                                        {state.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                                                    <Image
                                                        src={
                                                            item.image ||
                                                            "/placeholder-product.jpg"
                                                        }
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {item.color} •{" "}
                                                        {item.size} • Qty:{" "}
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                                <div className="font-semibold">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Shipping Info */}
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Shipping to:
                                    </h3>
                                    <div className="text-sm text-muted-foreground">
                                        <div>
                                            {form.firstName} {form.lastName}
                                        </div>
                                        <div>{form.address}</div>
                                        {form.address2 && (
                                            <div>{form.address2}</div>
                                        )}
                                        <div>
                                            {form.city}, {form.state}{" "}
                                            {form.zipCode}
                                        </div>
                                        <div>{form.phone}</div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Payment Method */}
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Payment Method:
                                    </h3>
                                    <div className="text-sm text-muted-foreground">
                                        {form.paymentMethod === "card" ? (
                                            <div>
                                                Credit/Debit Card ending in{" "}
                                                {form.cardNumber.slice(-4)}
                                            </div>
                                        ) : (
                                            <div className="capitalize">
                                                {form.paymentMethod}
                                            </div>
                                        )}
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
                            disabled={currentStep === 1}
                        >
                            Previous
                        </Button>

                        {currentStep < 3 ? (
                            <Button
                                onClick={nextStep}
                                className="btn-primary-gradient"
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isProcessing}
                                className="btn-primary-gradient"
                            >
                                {isProcessing
                                    ? "Processing..."
                                    : `Complete Order - $${total.toFixed(2)}`}
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
                                    <span>
                                        Subtotal ({state.itemCount} items)
                                    </span>
                                    <span>${subtotal.toFixed(2)}</span>
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
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
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
