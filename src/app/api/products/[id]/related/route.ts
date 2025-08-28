import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "../../utils";
import { GSheetProduct } from "@/types/products.type";
import { readRedisData } from "@/lib/redis";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const limit = 4; // You can adjust this limit as needed

    if (!id) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const transformedData = await readRedisData<GSheetProduct[]>(
      "google-sheet-all-products"
    );

    // Find the current product
    const product = transformedData.find((p) => p.id === id);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Filter related products by category or brand, excluding the current product
    const related = transformedData.filter(
      (p) =>
        p.id !== id &&
        (p.tags === product.tags ||
          p.brand === product.brand ||
          p.category === product.category ||
          p.subcategory === product.subcategory)
    );

    // Limit the number of related products returned
    return Response.json({ data: related.slice(0, limit) });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return Response.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}
