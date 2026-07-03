import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readProducts, writeProducts } from "@/lib/products-store";

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.slug || !body.name) {
    return NextResponse.json(
      { error: "Falta el slug o el nombre del producto" },
      { status: 400 }
    );
  }

  const products = await readProducts();
  if (products.some((p) => p.slug === body.slug)) {
    return NextResponse.json(
      { error: "Ya existe un producto con ese identificador (slug)" },
      { status: 400 }
    );
  }

  products.push(body);
  await writeProducts(products);
  return NextResponse.json({ ok: true });
}
