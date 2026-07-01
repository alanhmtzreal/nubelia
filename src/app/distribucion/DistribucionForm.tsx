"use client";

import { useState } from "react";

export default function DistribucionForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center border border-dark/10 p-10 text-center">
        <h3 className="font-display text-xl text-dark">¡Listo!</h3>
        <p className="mt-3 font-body text-sm text-dark/70">
          Recibimos tu información. Te contactaremos pronto para platicar
          sobre tu negocio.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4 border border-dark/10 p-6"
    >
      <input
        required
        placeholder="Nombre del negocio"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <input
        required
        placeholder="Nombre de contacto"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <input
        required
        type="email"
        placeholder="Correo electrónico"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <input
        required
        type="tel"
        placeholder="Teléfono"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <textarea
        placeholder="Cuéntanos sobre tu negocio y qué necesitas"
        rows={4}
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <button
        type="submit"
        className="bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
      >
        Enviar solicitud
      </button>
    </form>
  );
}
