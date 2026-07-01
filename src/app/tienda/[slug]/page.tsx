import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, products } from "@/data/products";
import ProductPurchaseBox from "./ProductPurchaseBox";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden bg-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-10 mix-blend-multiply"
            priority
          />
        </div>

        <div>
          <span className="font-body text-xs uppercase tracking-widest text-dark/50">
            {product.categoryLabel}
          </span>
          <h1 className="mt-2 font-display text-3xl text-dark sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 font-body text-dark/70">
            {product.shortDescription}
          </p>

          {product.specs && (
            <ul className="mt-6 flex flex-col gap-2 font-body text-sm text-dark/70">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-dark/50" />
                  {spec}
                </li>
              ))}
            </ul>
          )}

          <ProductPurchaseBox product={product} />

          <div className="mt-10 flex flex-col gap-4 border-t border-dark/10 pt-8 font-body text-sm text-dark/70">
            {product.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
