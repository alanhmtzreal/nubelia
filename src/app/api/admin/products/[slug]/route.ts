import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readProducts, writeProducts } from "@/lib/products-store";

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const products = await readProducts();
  const index = products.findIndex((p) => p.slug === params.slug);

  if (index === -1) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  products[index] = { ...body, slug: params.slug };
  await writeProducts(products);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const products = await readProducts();
  const filtered = products.filter((p) => p.slug !== params.slug);

  if (filtered.length === products.length) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  await writeProducts(filtered);
  return NextResponse.json({ ok: true });
}
