import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const ORDERS_COLLECTION = "orders";

// GET: Fetch all orders
export async function GET() {
  try {
    const ordersQuery = query(
      collection(db, ORDERS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(ordersQuery);
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const orderData = {
      ...body,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
    const newOrder = { id: docRef.id, ...orderData };
    return NextResponse.json({ data: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
