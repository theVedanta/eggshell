import { getSheetData } from "@/lib/gsheet";
import { Brand } from "@/types/brand.type";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json({
        error: "Missing brand name",
        status: 400,
      });
    }

    const data = await getSheetData("Brands");
    if (!data) {
      return NextResponse.json({
        error: "No data found",
        status: 404,
      });
    }

    const Brandsdata: Brand[] = data
      .filter((brand) => brand.brandname?.toLowerCase() === name.toLowerCase())
      .map((brand) => {
        return {
          id: brand.id,
          name: brand.brandname,
          description: brand.description,
          logo: brand.logo,
          banner: brand.banner,
          email: brand.email,
          featured: brand.featured === "TRUE" ? true : false,
        };
      });
    if (Brandsdata.length === 0) {
      return NextResponse.json({
        error: "Brand not found",
        status: 404,
      });
    }
    return NextResponse.json({ data: Brandsdata });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
