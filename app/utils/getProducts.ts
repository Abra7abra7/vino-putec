import fs from "fs";
import path from "path";
import { Product } from "../../types/Product";

// Define function to get all products (wines + degustacie)
export default async function getProducts(): Promise<Product[]> {
  try {
    const winesPath = path.join(process.cwd(), "configs", "wines.json");
    const degustaciePath = path.join(process.cwd(), "configs", "degustacie.json");
    
    let allProducts: Product[] = [];

    // Load wines
    if (fs.existsSync(winesPath)) {
      const wines: Product[] = JSON.parse(fs.readFileSync(winesPath, "utf-8"));
      allProducts = [...allProducts, ...wines];
    }

    // Load degustacie
    if (fs.existsSync(degustaciePath)) {
      const degustacie: Product[] = JSON.parse(fs.readFileSync(degustaciePath, "utf-8"));
      allProducts = [...allProducts, ...degustacie];
    }

    return allProducts.filter((product) => product.CatalogVisible);
  } catch (error) {
    console.error("Error loading products files:", error);
    return [];
  }
}

// Function to get wines only
export async function getWines(): Promise<Product[]> {
  try {
    const winesPath = path.join(process.cwd(), "configs", "wines.json");

    if (!fs.existsSync(winesPath)) {
      return [];
    }

    const wines: Product[] = JSON.parse(fs.readFileSync(winesPath, "utf-8"));
    return wines.filter((product) => product.CatalogVisible);
  } catch (error) {
    console.error("Error loading wines file:", error);
    return [];
  }
}

// Function to get degustacie only
export async function getDegustacie(): Promise<Product[]> {
  try {
    const degustaciePath = path.join(process.cwd(), "configs", "degustacie.json");

    if (!fs.existsSync(degustaciePath)) {
      return [];
    }

    const degustacie: Product[] = JSON.parse(fs.readFileSync(degustaciePath, "utf-8"));
    return degustacie.filter((product) => product.CatalogVisible);
  } catch (error) {
    console.error("Error loading degustacie file:", error);
    return [];
  }
}

// Function to get a product by slug
export function getProductBySlug(slug: string): Product | undefined {
  try {
    const winesPath = path.join(process.cwd(), "configs", "wines.json");
    const degustaciePath = path.join(process.cwd(), "configs", "degustacie.json");
    
    let allProducts: Product[] = [];

    // Load wines
    if (fs.existsSync(winesPath)) {
      const wines: Product[] = JSON.parse(fs.readFileSync(winesPath, "utf-8"));
      allProducts = [...allProducts, ...wines];
    }

    // Load degustacie
    if (fs.existsSync(degustaciePath)) {
      const degustacie: Product[] = JSON.parse(fs.readFileSync(degustaciePath, "utf-8"));
      allProducts = [...allProducts, ...degustacie];
    }

    return allProducts.find((product) => product.Slug === slug);
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return undefined;
  }
}
