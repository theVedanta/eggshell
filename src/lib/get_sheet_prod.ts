import { GSheetProduct } from "@/types/products.type";

type ProductResponse = {
  products: GSheetProduct[];
};
const sheetDBUrl =
  "https://script.google.com/macros/s/AKfycbwsuuY8Tfg6D7GIazcX3p9LTfgIVWQKLBkjkUaoYO-el3ZglpJKMqTJjkk5xs52DhVsnw/exec";

export async function getSheetProdducts(): Promise<GSheetProduct[]> {
  try {
    const sheetData = await fetch(sheetDBUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!sheetData.ok) {
      throw new Error("Failed to fetch data from the sheet");
    }

    const json: ProductResponse = await sheetData.json();
    return json.products;
  } catch (error) {
    console.error("Error fetching products from sheet:", error);
    throw error;
  }
}
