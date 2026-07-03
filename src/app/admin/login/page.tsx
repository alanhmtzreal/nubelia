"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Contraseña incorrecta");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-cream/20 p-8"
      >
        <h1 className="mb-6 font-display text-2xl text-cream">
          Panel Nubelia
        </h1>
        <label className="mb-2 block font-body text-xs uppercase tracking-widest text-cream/60">
          Contraseña
        </label>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-cream/30 bg-transparent px-4 py-3 font-body text-sm text-cream"
        />
        {error && (
          <p className="mt-3 font-body text-sm text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-cream py-3 font-body text-sm uppercase tracking-widest text-dark transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
