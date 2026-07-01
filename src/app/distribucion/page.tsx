import type { Metadata } from "next";
import DistribucionForm from "./DistribucionForm";

export const metadata: Metadata = {
  title: "Distribución | Nubelia",
};

export default function DistribucionPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
        Nubelia para negocios
      </p>
      <h1 className="mt-2 font-display text-4xl text-dark">Distribución</h1>
      <p className="mt-4 max-w-2xl font-body text-dark/70">
        Trabajamos con hoteles, spas, oficinas, tiendas y otros negocios que
        buscan mejorar su identidad olfativa. Si compras por volumen, te
        ofrecemos precios preferenciales sobre nuestro catálogo de turbos,
        room spray y difusores.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6 font-body text-dark/70">
          <div>
            <h3 className="font-display text-lg text-dark">
              ¿Para quién es?
            </h3>
            <p className="mt-2 text-sm">
              Hoteles, spas, consultorios, oficinas, restaurantes, tiendas y
              cualquier negocio que quiera que sus clientes recuerden su
              espacio también por cómo huele.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg text-dark">
              ¿Qué obtienes?
            </h3>
            <p className="mt-2 text-sm">
              Precio especial por volumen sobre nuestros productos, asesoría
              para elegir el aroma adecuado para tu marca y, si lo necesitas,
              instalación y mantenimiento de difusores.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg text-dark">¿Cómo empezar?</h3>
            <p className="mt-2 text-sm">
              Cuéntanos sobre tu negocio en el formulario y nos pondremos en
              contacto para armar una propuesta a tu medida.
            </p>
          </div>
        </div>

        <DistribucionForm />
      </div>
    </div>
  );
}
