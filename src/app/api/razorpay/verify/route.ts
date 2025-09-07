import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

/**
 * Verifies the payment signature returned by Razorpay Checkout.
 * @param orderId Razorpay order_id
 * @param paymentId Razorpay payment_id
 * @param signature Razorpay signature
 * @returns true if signature is valid, false otherwise
 */
function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

// POST /api/razorpay/verify
export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json();
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: "orderId, paymentId, and signature are required" },
        { status: 400 }
      );
    }
    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
    return NextResponse.json({ valid: isValid });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to verify signature" },
      { status: 500 }
    );
  }
}