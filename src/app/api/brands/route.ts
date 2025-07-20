import { getSheetData } from "@/lib/gsheet";

export async function GET() {
  const data = await getSheetData("Brands");

  return Response.json({ data });
}
