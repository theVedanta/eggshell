import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const ORDERS_COLLECTION = "cartinfo";

export async function GET() {
  try {
    const ordersQuery = query(
      collection(db, ORDERS_COLLECTION),

      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(ordersQuery);

    const cartData = snapshot.docs.map((doc) => ({
      id: doc.id,

      ...doc.data(),
    }));

    return NextResponse.json({ data: cartData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart data" },

      { status: 500 }
    );
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const cartData = {
      ...body,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), cartData);
    const newCartItem = { id: docRef.id, ...cartData };
    return NextResponse.json({ data: newCartItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create cart item" },
      { status: 500 }
    );
  }
}
