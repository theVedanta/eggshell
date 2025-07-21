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

export async function getDoc() {
  const doc = new GoogleSpreadsheet(
    "17G_SVOO0srm33sBa-1PCE-3S_Kv95v5WNFhvbQK_Xfk",
    serviceAccountAuth
  );

  await doc.loadInfo();
  return doc;
}

export async function getSheet(title: string) {
  const doc = await getDoc();
  return doc.sheetsByTitle[title];
}

export async function getSheetData(title: string) {
  const sheet = await getSheet(title);
  const rows = await sheet.getRows();

  const data = rows.map((row) => {
    const obj = row.toObject();
    const lowercasedObj: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        lowercasedObj[key.toLowerCase()] = obj[key];
      }
    }

    return lowercasedObj;
  });

  return data;
}
