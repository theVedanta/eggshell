import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "@/app/api/products/utils";
import { GSheetProduct } from "@/types/products.type";

export async function GET(_req: NextRequest) {
  try {
    const limit = 4; // You can adjust this limit as needed

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
