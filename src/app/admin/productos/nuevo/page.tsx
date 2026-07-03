import ProductForm from "../../ProductForm";

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <h1 className="mx-auto mb-8 max-w-2xl font-display text-3xl text-dark">
        Nuevo producto
      </h1>
      <ProductForm />
    </div>
  );
}
