import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function listImagesFrom(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    const images = files.filter((name) => /\.(png|jpe?g|webp|avif)$/i.test(name));
    const publicSegment = dirPath.split(path.sep).slice(dirPath.split(path.sep).indexOf("public") + 1).join("/");
    return images.map((file) => `/${publicSegment}/${file}`);
  } catch {
    return [];
  }
}

export async function GET(_request: NextRequest) {
  try {
    // Prefer canonical folders if present
    const baseCanonical = path.join(process.cwd(), "public", "ubytovanie");
    const exterierCanonical = listImagesFrom(path.join(baseCanonical, "exterier"));
    const izbyCanonical = listImagesFrom(path.join(baseCanonical, "izby"));

    // Also support current folders with different naming found in the project
    const exterierAlt = listImagesFrom(path.join(process.cwd(), "public", "ubytovanie-exterier"));
    const izbyAlt = listImagesFrom(path.join(process.cwd(), "public", "ubytovanie izby"));

    const exterier = [...exterierCanonical, ...exterierAlt];
    const izby = [...izbyCanonical, ...izbyAlt];

    return NextResponse.json({ exterier, izby });
  } catch (error) {
    console.error("Error reading ubytovanie gallery:", error);
    return NextResponse.json({ exterier: [], izby: [] }, { status: 500 });
  }
}


