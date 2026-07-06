"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

function toDateInputValue(date?: string) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return date.slice(0, 10);
}

export default function PostForm({ initialPost }: { initialPost?: Post }) {
  const router = useRouter();
  const isEdit = !!initialPost;

  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(
    initialPost?.content?.join("\n\n") ?? ""
  );
  const [date, setDate] = useState(toDateInputValue(initialPost?.date));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      slug,
      title,
      excerpt,
      content: content
        .split("\n\n")
        .map((s) => s.trim())
        .filter(Boolean),
      date,
    };

    const res = await fetch(
      isEdit ? `/api/admin/posts/${initialPost!.slug}` : "/api/admin/posts",
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

    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5 pb-20">
      {!isEdit && (
        <div>
          <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
            Identificador único (sin espacios ni acentos, ej. &quot;mi-nuevo-post&quot;)
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
          Título
        </label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Fecha
        </label>
        <input
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Resumen corto (se muestra en la lista del blog)
        </label>
        <textarea
          required
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-xs uppercase tracking-widest text-dark/60">
          Contenido (separa cada párrafo dejando una línea en blanco)
        </label>
        <textarea
          required
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
        />
      </div>

      {error && <p className="font-body text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Guardando…" : "Guardar post"}
      </button>
    </form>
  );
}
