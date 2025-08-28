import { NextRequest } from "next/server";
import { GSheetProduct } from "@/types/products.type";

import { readRedisData } from "@/lib/redis";
type sideBarCategories = "footwear" | "apparel" | "accessories";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const category = await params;
    if (!category.type) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }
    const transformedData = await readRedisData<GSheetProduct[]>(
      "google-sheet-all-products"
    );

    // Filter subcategories by the selected category
    // ...existing code...
    // Filter subcategories by the selected category and get unique names
    const allSubcategories = Array.from(
      new Set(
        transformedData
          .filter(
            (p) =>
              (p.category as sideBarCategories) ===
              (category.type as sideBarCategories)
          )
          .map((p) => p.subcategory)
      )
    );

    return Response.json({ data: allSubcategories });
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
