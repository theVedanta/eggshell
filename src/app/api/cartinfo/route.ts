import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const ORDERS_COLLECTION = "cartinfo";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Use simple query without orderBy to avoid composite index requirement
    const ordersQuery = query(
      collection(db, ORDERS_COLLECTION),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(ordersQuery);

    const cartData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort by createdAt client-side (newest first)
    const sortedCartData = cartData.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA; // desc order
    });

    return NextResponse.json({ data: sortedCartData }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching cart data:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart data" },
      { status: 500 }
    );
  }
}

// POST: Create or update a cart item (upsert)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, userId, productId, selectedColor, size, quantity, ...rest } =
      body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Check if item already exists by ID
    const cartItemRef = doc(db, ORDERS_COLLECTION, id);
    const existingDoc = await getDoc(cartItemRef);

    if (existingDoc.exists()) {
      // Update existing item - use the quantity from the request
      const updatedData = {
        ...body,
        updatedAt: now,
      };

      await updateDoc(cartItemRef, updatedData);
      return NextResponse.json({ data: { ...updatedData } }, { status: 200 });
    } else {
      // Create new item
      const cartData = {
        ...body,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(cartItemRef, cartData);
      return NextResponse.json({ data: cartData }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Error creating/updating cart item:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create/update cart item" },
      { status: 500 }
    );
  }
}

// PUT: Update a cart item
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, userId, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const updatedData = {
      ...updateData,
      userId,
      updatedAt: now,
    };

    const cartItemRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(cartItemRef, updatedData);

    return NextResponse.json(
      {
        data: { id, ...updatedData },
        message: "Cart item updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a cart item
export async function DELETE(req: NextRequest) {
  try {
    const itemId = req.nextUrl.searchParams.get("id");
    const userId = req.nextUrl.searchParams.get("userId");

    if (!itemId) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const cartItemRef = doc(db, ORDERS_COLLECTION, itemId);
    await deleteDoc(cartItemRef);

    return NextResponse.json(
      { message: "Cart item deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
