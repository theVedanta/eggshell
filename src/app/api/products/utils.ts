import { Colors } from "@/types/products.type";

export function get_color_image_map(rawProduct: any): Colors {
  // Google Sheet Format for : color_image_map
  // Color | img1, img2, img3... ; Color | img1, img2...
  // Also support entries that have no color and are just a list of images
  // e.g. "https://... , https://..." -> should be treated as Default color
  const colors: Colors = [];
  if (rawProduct.color_image_map) {
    rawProduct.color_image_map.split(";").forEach((entry: string) => {
      if (!entry || !entry.trim()) return;
      const parts = entry.split("|").map((str: string) => str.trim());
      let color: string;
      let imagesStr: string;

      if (parts.length > 1) {
        // If there's a color part present
        color = parts[0] || "Default";
        // In case there are additional '|' characters, join the rest back as images string
        imagesStr = parts.slice(1).join("|").trim();
      } else {
        // No color provided, treat the whole entry as images and use "Default" color
        color = "Default";
        imagesStr = parts[0];
      }

      if (imagesStr) {
        const productImages = imagesStr
          .split(",") // use comma as delimiter
          .map((img: string) => img.trim())
          .filter(Boolean);

        if (productImages.length > 0) {
          colors.push({
            productColor: color,
            productImages,
          });
        }
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
