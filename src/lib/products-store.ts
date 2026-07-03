import fs from "fs/promises";
import path from "path";
import { Product } from "@/types/product";

const DATA_PATH = path.join(process.cwd(), "src/data/products.json");

export async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Product[];
}

export async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2) + "\n", "utf-8");
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await readProducts();
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await readProducts();
  return products.filter((p) => p.featured);
}
