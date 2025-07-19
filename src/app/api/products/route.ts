import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// For setting up authentication later with Anav:
// https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

export async function GET() {
  const doc = new GoogleSpreadsheet(
    "17G_SVOO0srm33sBa-1PCE-3S_Kv95v5WNFhvbQK_Xfk",
    serviceAccountAuth
  );

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle["Test"];
  const rows = await sheet.getRows();
  const data = rows.map((row) => row.toObject());

  console.log(data);

  return Response.json({ title: doc.title, data });
}
