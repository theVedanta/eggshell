import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import { GSheetProduct } from "@/types/products.type";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "../../utils";
import { readRedisData } from "@/lib/redis";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: brand } = await params;

    if (!brand) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }
    const transformedData = await readRedisData<GSheetProduct[]>(
      "google-sheet-all-products"
    );

    // Filter products by the requested brand
    const allProducts = transformedData.filter((p) => p.brand === brand);

    return Response.json({ data: allProducts });
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
