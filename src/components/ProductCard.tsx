import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/tienda/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm bg-white/40 transition hover:bg-white/70"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 mix-blend-multiply transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="font-body text-xs uppercase tracking-widest text-dark/50">
          {product.categoryLabel}
        </span>
        <h3 className="font-display text-lg text-dark">{product.name}</h3>
        <p className="mt-1 font-body text-sm text-dark/60 line-clamp-2">
          {product.shortDescription}
        </p>
        <span className="mt-3 font-display text-base text-dark">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
