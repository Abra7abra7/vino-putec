import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "configs", "degustacie.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const degustacie = JSON.parse(fileContents);

    return NextResponse.json({ degustacie });
  } catch (error) {
    console.error("Error reading degustacie:", error);
    return NextResponse.json({ degustacie: [] }, { status: 500 });
  }
}
