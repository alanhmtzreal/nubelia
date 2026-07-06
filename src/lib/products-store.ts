import { Product } from "@/types/product";
import { getSupabaseClient } from "@/lib/supabase";

interface ProductRow {
  slug: string;
  name: string;
  category: string;
  category_label: string;
  price: number | null;
  image: string;
  short_description: string;
  description: string[];
  specs: string[] | null;
  aromas: string[] | null;
  featured: boolean | null;
  sort_order: number;
}

function rowToProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category as Product["category"],
    categoryLabel: row.category_label,
    price: row.price,
    image: row.image,
    shortDescription: row.short_description,
    description: row.description,
    specs: row.specs ?? undefined,
    aromas: row.aromas ?? undefined,
    featured: row.featured ?? undefined,
  };
}

function productToRow(product: Product, sortOrder: number): ProductRow {
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    category_label: product.categoryLabel,
    price: product.price,
    image: product.image,
    short_description: product.shortDescription,
    description: product.description,
    specs: product.specs ?? null,
    aromas: product.aromas ?? null,
    featured: product.featured ?? false,
    sort_order: sortOrder,
  };
}

export async function readProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as ProductRow[]).map(rowToProduct);
}

export async function writeProducts(products: Product[]): Promise<void> {
  const supabase = getSupabaseClient();
  const rows = products.map((p, index) => productToRow(p, index));

  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .neq("slug", "");
  if (deleteError) throw new Error(deleteError.message);

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("products").insert(rows);
    if (insertError) throw new Error(insertError.message);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToProduct(data as ProductRow) : undefined;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as ProductRow[]).map(rowToProduct);
}
