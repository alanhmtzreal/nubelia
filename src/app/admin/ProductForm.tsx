"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductCategory, CATEGORY_OPTIONS } from "@/types/product";

export default function ProductForm({
  initialProduct,
}: {
  initialProduct?: Product;
}) {
  const router = useRouter();
  const isEdit = !!initialProduct;

  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    initialProduct?.category ?? "turbo"
  );
  const [categoryLabel, setCategoryLabel] = useState(
    initialProduct?.categoryLabel ?? ""
  );
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [image, setImage] = useState(initialProduct?.image ?? "");
  const [shortDescription, setShortDescription] = useState(
    initialProduct?.shortDescription ?? ""
  );
  const [description, setDescription] = useState(
    initialProduct?.description?.join("\n\n") ?? ""
  );
  const [specs, setSpecs] = useState(initialProduct?.specs?.join("\n") ?? "");
  const [aromas, setAromas] = useState(
    initialProduct?.aromas?.join("\n") ?? ""
  );
  const [featured, setFeatured] = useState(initialProduct?.featured ?? false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      slug,
      name,
      category,
      categoryLabel,
      price: price.trim() === "" ? null : Number(price),
      image,
      shortDescription,
      description: description
        .split("\n\n")
        .map((s) => s.trim())
        .filter(Boolean),
      specs: specs
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      aromas: aromas
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      featured,
    };

    const res = await fetch(
      isEdit ? `/api/admin/products/${initialProduct!.slug}` : "/api/admin/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Ocurrió un error al guardar.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5 pb-20">
      {!isEdit && (
        <div>
          <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
            Identificador único (sin espacios ni acentos, ej. &quot;turbo-vainilla&quot;)
          </label>
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Nombre del producto
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
            Etiqueta visible de categoría
          </label>
          <input
            required
            value={categoryLabel}
            onChange={(e) => setCategoryLabel(e.target.value)}
            className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Precio en MXN (déjalo vacío para mostrar &quot;Consultar precio&quot;)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Ruta de la imagen (colócala en public/images/productos/ con este mismo nombre)
        </label>
        <input
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/productos/nombre-archivo.jpg"
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Descripción corta
        </label>
        <textarea
          required
          rows={2}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Descripción larga (separa cada párrafo dejando una línea en blanco)
        </label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Características (una por línea)
        </label>
        <textarea
          rows={3}
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Aromas disponibles (uno por línea, déjalo vacío si no aplica)
        </label>
        <textarea
          rows={4}
          value={aromas}
          onChange={(e) => setAromas(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <label className="flex items-center gap-2 font-body text-sm text-dark/70">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Mostrar en la página de inicio (producto destacado)
      </label>

      {error && <p className="font-body text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Guardando…" : "Guardar producto"}
      </button>
    </form>
  );
}
