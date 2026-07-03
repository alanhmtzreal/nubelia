import Link from "next/link";
import { readProducts } from "@/lib/products-store";
import { formatPrice } from "@/lib/format";
import LogoutButton from "./LogoutButton";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await readProducts();

  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-dark">
            Panel de productos
          </h1>
          <div className="flex gap-3">
            <Link
              href="/admin/productos/nuevo"
              className="bg-dark px-5 py-2 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
            >
              + Nuevo producto
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="flex flex-col divide-y divide-dark/10 border border-dark/10 bg-white/40">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            >
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-dark/50">
                  {product.categoryLabel}
                </p>
                <p className="font-display text-lg text-dark">
                  {product.name}
                </p>
                <p className="font-body text-sm text-dark/70">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/productos/${product.slug}`}
                  className="font-body text-sm text-dark/70 underline hover:text-dark"
                >
                  Editar
                </Link>
                <DeleteProductButton slug={product.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
