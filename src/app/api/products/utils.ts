import { Colors } from "@/types/products.type";

export function get_color_image_map(rawProduct: any): Colors {
  // Google Sheet Formate for : color_image_map
  // Color | img1 ~ img2 ~ img3... ,  Color | img1 ~ ...
  const colors: Colors = [];
  if (rawProduct.color_image_map) {
    rawProduct.color_image_map.split(";").forEach((entry: string) => {
      const [color, images] = entry.split("|").map((str: string) => str.trim());
      if (color && images) {
        colors.push({
          productColor: color,
          productImages: images
            .split("~") // Use ~ as delimiter instead of comma
            .map((img: string) => img.trim())
            .filter(Boolean),
        });
      }
    });
  }
  return colors;
}

export function getAllsizes(rawProduct: any): string[] {
  // Convert sizes to array
  return rawProduct.sizes
    ? rawProduct.sizes
        .split(";")
        .map((size: string) => size.trim())
        .filter(Boolean)
    : [];
}

export function getAllTags(rawProduct: any): string[] {
  // Convert tags to array
  return rawProduct.tags
    ? rawProduct.tags
        .split(";")
        .map((tag: string) => tag.trim())
        .filter(Boolean)
    : [];
}

export function convertBooleanFields(rawProduct: any): {
  in_stock: boolean;
  featured: boolean;
} {
  // Convert in_stock and featured to boolean
  const in_stock =
    typeof rawProduct.in_stock === "string"
      ? rawProduct.in_stock.trim().toLowerCase() === "true"
      : Boolean(rawProduct.in_stock);

  const featured =
    typeof rawProduct.featured === "string"
      ? rawProduct.featured.trim().toLowerCase() === "true"
      : Boolean(rawProduct.featured);

  return { in_stock, featured };
}
