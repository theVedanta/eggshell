import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";

const ORDERS_COLLECTION = "orders";
export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("id");

    // If orderId is provided, fetch specific order
    if (orderId) {
      const orderDoc = await getDoc(doc(db, ORDERS_COLLECTION, orderId));
      if (!orderDoc.exists()) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      const order = { id: orderDoc.id, ...orderDoc.data() };
      return NextResponse.json({ data: order }, { status: 200 });
    }

    // If no orderId, fetch all orders
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
