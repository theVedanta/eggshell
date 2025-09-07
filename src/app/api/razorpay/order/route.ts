import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const RAZORPAY_BASE_URL = "https://api.razorpay.com/v1/";

const razorpayApi = axios.create({
  baseURL: RAZORPAY_BASE_URL,
  auth: {
    username: RAZORPAY_KEY_ID,
    password: RAZORPAY_KEY_SECRET,
  },
});

/**
 * Creates a Razorpay order for the given amount and currency.
 * @param amountInRupees Amount in rupees (e.g., 499 for ₹499)
 * @param receiptId Optional receipt identifier for your reference
 * @param notes Optional notes object to attach to the order
 * @returns Razorpay order object
 */
async function createRazorpayOrder(
  amountInRupees: number,
  receiptId?: string,
  notes?: Record<string, string>
) {
  // Razorpay expects amount in paise (1 INR = 100 paise)
  const amount = amountInRupees * 100;
  const data: any = {
    amount,
    currency: "INR",
    payment_capture: 1,
  };
  if (receiptId) data.receipt = receiptId;
  if (notes) data.notes = notes;

  const response = await razorpayApi.post("/orders", data);
  return response.data;
}

// POST /api/razorpay/order
export async function POST(request: NextRequest) {
  try {
    const { amountInRupees, receiptId, notes } = await request.json();
    if (!amountInRupees) {
      return NextResponse.json(
        { error: "amountInRupees is required" },
        { status: 400 }
      );
    }
    const order = await createRazorpayOrder(amountInRupees, receiptId, notes);
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
