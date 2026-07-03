import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-store";
import ProductForm from "../../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <h1 className="mx-auto mb-8 max-w-2xl font-display text-3xl text-dark">
        Editar: {product.name}
      </h1>
      <ProductForm initialProduct={product} />
    </div>
  );
}
