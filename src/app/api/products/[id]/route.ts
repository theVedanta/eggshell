import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import { GSheetProduct } from "@/types/products.type";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "../utils";

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
    const data = await getSheetData("Products");

    // Find the product with matching ID
    const rawProduct = data.find((item) => item.id === id);

    if (!rawProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Google Sheet Formate for : color_image_map
    const colors = get_color_image_map(rawProduct);

    // Convert sizes to array
    const sizesArray = getAllsizes(rawProduct);

    // Convert tags to array
    const tagsArray = getAllTags(rawProduct);

    // Convert in_stock and featured to boolean
    const { in_stock, featured } = convertBooleanFields(rawProduct);

    // Create the product object with explicit property mapping
    const product: GSheetProduct = {
      id: rawProduct.id,
      name: rawProduct.name,
      description: rawProduct.description,
      price: parseFloat(rawProduct.price) || 0,
      originalPrice: rawProduct.original_price
        ? parseFloat(rawProduct.original_price)
        : undefined,
      category: rawProduct.category,
      subcategory: rawProduct.subcategory,
      brand: rawProduct.brand,
      colors,
      sizes: sizesArray,
      inStock: in_stock,
      featured,
      rating: rawProduct.rating ? parseFloat(rawProduct.rating) : undefined,
      reviewCount: rawProduct.reviewCount
        ? parseInt(rawProduct.reviewCount)
        : undefined,
      tags: tagsArray,
    };

    return Response.json({ data: product });
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
