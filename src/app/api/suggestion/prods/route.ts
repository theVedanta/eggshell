import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { readRedisData } from "@/lib/redis";
import { GSheetProduct } from "@/types/products.type";

const USER_LIKING_COLLECTION = "user_liking";
export async function GET(req: NextRequest) {
  const user = await auth();

  if (!user?.userId) {
    return NextResponse.json(
      {
        Msg: "User not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const userDocRef = doc(db, USER_LIKING_COLLECTION, user.userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userLiking = userDoc.data().allTopPreferences || [];

      // Find the object with highest priority value
      const highestPriorityItem = userLiking.reduce(
        (max: any, current: any) => {
          return max.priority > current.priority ? max : current;
        },
        userLiking[0]
      );

      // Get all products from the sheet
      const transformedData = await readRedisData<GSheetProduct[]>(
        "google-sheet-all-products"
      );

      const filteredProducts = transformedData
        .filter(
          (product) =>
            product.category === highestPriorityItem.category &&
            product.subcategory === highestPriorityItem.subcategory
        )
        .slice(0, 10);
      return NextResponse.json({
        highestPriority: highestPriorityItem,
        filteredProducts,
      });
    } else {
      return NextResponse.json(
        {
          Msg: "No preferences found for user",
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching user preferences:", error);
    return NextResponse.json(
      {
        Msg: "Error fetching user preferences",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
