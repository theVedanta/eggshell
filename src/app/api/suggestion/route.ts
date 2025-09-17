import { setUserLikingQue } from "@/lib/redis";
import { ProdInfoType } from "@/query-calls/suggestion-query";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  increment,
} from "firebase/firestore";

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
      return NextResponse.json({
        Msg: "User preferences fetched successfully",
        data: userDoc.data(),
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

export async function POST(req: NextRequest) {
  const user = await auth();

  if (!user?.userId) {
    return NextResponse.json(
      {
        Msg: "User not authenticated",
      },
      { status: 401 }
    );
  }

  const data = (await req.json()) as ProdInfoType;
  if (!data) {
    return NextResponse.json({
      Msg: "No data provided",
    });
  }

  try {
    // Store in Redis with aggregated preferences
    const topPreferences = await setUserLikingQue(`user-${user.userId}`, data);

    // Store all preferences in Firebase, not just top one
    const userDocRef = doc(db, USER_LIKING_COLLECTION, user.userId);

    // Get current document to check existing preferences
    const userDoc = await getDoc(userDocRef);
    let allPreferences = [];

    if (userDoc.exists()) {
      allPreferences = userDoc.data().allTopPreferences || [];
    }

    // Find if preference exists by category and subcategory
    const existingPrefIndex = allPreferences.findIndex(
      (pref: any) =>
        pref.category === data.category && pref.subcategory === data.subCategory
    );

    if (existingPrefIndex >= 0) {
      // Update existing preference with new priority from Redis
      const updatedPref = topPreferences.find(
        (pref) =>
          pref.category === data.category &&
          pref.subcategory === data.subCategory
      );
      if (updatedPref) {
        allPreferences[existingPrefIndex] = updatedPref;
      }
    } else {
      // Add new unique preference
      const newPref = topPreferences.find(
        (pref) =>
          pref.category === data.category &&
          pref.subcategory === data.subCategory
      );
      if (newPref) {
        allPreferences.push(newPref);
      }
    }

    await setDoc(
      userDocRef,
      {
        userId: user.userId,
        allTopPreferences: allPreferences,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({
      Msg: "Data stored successfully in Redis and Firebase",
      topPreferences: allPreferences,
    });
  } catch (error: any) {
    console.error("Error storing data:", error);
    return NextResponse.json(
      {
        Msg: "Error storing data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
