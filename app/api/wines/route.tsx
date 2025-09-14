import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "configs", "wines.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const wines = JSON.parse(fileContents);

    return NextResponse.json({ wines });
  } catch (error) {
    console.error("Error reading wines:", error);
    return NextResponse.json({ wines: [] }, { status: 500 });
  }
}
