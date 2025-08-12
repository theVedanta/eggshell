import { getSheetData } from "@/lib/gsheet";
import { Brand } from "@/types/brand.type";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSheetData("Brands");
    if (!data) {
      return NextResponse.json({
        error: "No data found",
        status: 404,
      });
    }
    const Brandsdata: Brand[] = data.map((brand) => {
      return {
        id: brand.id,
        name: brand.brandname,
        description: brand.description,
        logo: brand.logo,
        featured: brand.featured === "TRUE" ? true : false,
      };
    });
    return Response.json({ data: Brandsdata });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
