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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const safeCategory = category.replace(/[^a-z0-9-_]/gi, "");
  const base = path.join(process.cwd(), "public", "galeria", safeCategory);
  const photos = listImagesFrom(base);
  return NextResponse.json({ category: safeCategory, photos });
}


