import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import { GSheetProduct } from "@/types/products.type";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "../utils";
import { readRedisData } from "@/lib/redis";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }

    // Get all products from the sheet
    const transformedData = await readRedisData<GSheetProduct[]>(
      "google-sheet-all-products"
    );

    // Find the product with matching ID
    const rawProduct = transformedData.find((item) => item.id === id);

    if (!rawProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Create the product object with explicit property mapping
    const product: GSheetProduct = {
      ...rawProduct,
    };

    return Response.json({ data: product });
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
