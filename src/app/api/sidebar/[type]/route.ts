import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import { GSheetProduct } from "@/types/products.type";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "@/app/api/products/utils";
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
    const data = await getSheetData("Products");
    const transformedData: GSheetProduct[] = data.map((item: any) => {
      // Parse color_image_map into array of objects
      const colors = get_color_image_map(item);

      // Convert sizes to array
      const sizesArray = getAllsizes(item);

      // Convert in_stock and featured to boolean
      const { in_stock, featured } = convertBooleanFields(item);

      // Convert tags to array
      const tagsArray = getAllTags(item);

      // Remove processed fields and create clean product object
      const {
        color_image_map,
        sizes: _sizes,
        in_stock: _in_stock,
        featured: _featured,
        tags: _tags,
        ...rest
      } = item;

      const product: GSheetProduct = {
        ...rest,
        colors,
        sizes: sizesArray,
        inStock: in_stock,
        featured,
        tags: tagsArray,
        price: parseFloat(rest.price) || 0,
        originalPrice: rest.original_price
          ? parseFloat(rest.original_price)
          : undefined,
      };

      return product;
    });

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
