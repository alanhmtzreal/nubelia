"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }
    setLoading(true);
    await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="font-body text-sm text-red-700 underline disabled:opacity-50"
    >
      Eliminar
    </button>
  );
}
