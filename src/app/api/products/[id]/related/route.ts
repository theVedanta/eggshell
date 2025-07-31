import { NextRequest } from "next/server";
import { getSheetData } from "@/lib/gsheet";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "../../utils";
import { GSheetProduct } from "@/types/products.type";

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
