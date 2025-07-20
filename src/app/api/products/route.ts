import { getSheetData } from "@/lib/gsheet";

export async function GET() {
  const data = await getSheetData("Products");

  const transformedData = data.map((item: any) => {
    const colors: Record<string, string[]> = {};
    if (item.color_image_map) {
      item.color_image_map.split(";").forEach((entry: string) => {
        const [color, images] = entry.split("|").map((str) => str.trim());
        if (color && images) {
          colors[color.toLowerCase()] = images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean);
        }
      });
    }

    // Convert sizes to array
    const sizes = item.sizes
      ? item.sizes
          .split(";")
          .map((size: string) => size.trim())
          .filter(Boolean)
      : [];

    // Convert in_stock and featured to boolean
    const in_stock =
      typeof item.in_stock === "string"
        ? item.in_stock.trim().toLowerCase() === "true"
        : Boolean(item.in_stock);

    const featured =
      typeof item.featured === "string"
        ? item.featured.trim().toLowerCase() === "true"
        : Boolean(item.featured);

    // Convert tags to array
    const tags = item.tags
      ? item.tags
          .split(";")
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      : [];

    // Remove color_image_map and add colors, sizes, in_stock, featured, tags
    const {
      color_image_map,
      sizes: _sizes,
      in_stock: _in_stock,
      featured: _featured,
      tags: _tags,
      ...rest
    } = item;
    return {
      ...rest,
      colors,
      sizes,
      in_stock,
      featured,
      tags,
    };
  });

  return Response.json({ data: transformedData });
}
