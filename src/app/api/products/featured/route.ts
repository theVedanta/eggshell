import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "@/app/api/products/utils";
import { GSheetProduct } from "@/types/products.type";
import { readRedisData } from "@/lib/redis";

export async function GET(_req: NextRequest) {
  try {
    const limit = 4; // You can adjust this limit as needed

    const transformedData = await readRedisData<GSheetProduct[]>(
      "google-sheet-all-products"
    );

    // Filter related products by category or brand, excluding the current product
    const featuredProd = transformedData.filter((p) => p);

    // Limit the number of related products returned
    return Response.json({ data: featuredProd.slice(0, limit) });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return Response.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}
