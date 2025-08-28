import { getSheetData } from "@/lib/gsheet";
import { GSheetProduct } from "@/types/products.type";
import {
  convertBooleanFields,
  get_color_image_map,
  getAllsizes,
  getAllTags,
} from "../utils";
import { reValidateGoogleSheetDataInRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redisCachedFinalData = reValidateGoogleSheetDataInRedis<
      GSheetProduct[]
    >("google-sheet-all-products", async () => {
      const rawdata = await getSheetData("Products");
      const transformedData: GSheetProduct[] = rawdata.map((item: any) => {
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
      return transformedData;
    });

    return Response.json({ data: redisCachedFinalData });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
