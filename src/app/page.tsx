import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-cream px-6 text-center">
        <Image
          src="/images/marca/isotipo.png"
          alt=""
          width={320}
          height={248}
          className="mb-6 h-48 w-auto object-contain mix-blend-multiply opacity-90"
        />
        <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-dark/60">
          Marketing olfativo
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight text-dark sm:text-6xl">
          El aroma que hace inolvidable tu espacio
        </h1>
        <p className="mt-6 max-w-xl font-body text-base text-dark/70">
          Turbos ambientadores, room spray y difusores diseñados para
          transformar la manera en que tu hogar o tu negocio se sienten.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/tienda"
            className="bg-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
          >
            Ir a la tienda
          </Link>
          <Link
            href="/distribucion"
            className="border border-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-dark transition hover:bg-dark hover:text-cream"
          >
            Soy un negocio
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
            Nuestro catálogo
          </p>
          <h2 className="mt-2 font-display text-3xl text-dark">
            Productos destacados
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Brand strip */}
      <section className="bg-dark px-6 py-20 text-cream">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
          <div className="text-center">
            <h3 className="font-display text-xl">Alta concentración</h3>
            <p className="mt-3 font-body text-sm text-cream/70">
              Fórmulas con mayor duración y cobertura que los ambientadores
              tradicionales.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-display text-xl">Para hogar y negocio</h3>
            <p className="mt-3 font-body text-sm text-cream/70">
              Soluciones de aromatización a la medida de espacios chicos,
              grandes y comerciales.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-display text-xl">Amplio catálogo de aromas</h3>
            <p className="mt-3 font-body text-sm text-cream/70">
              Encuentra la fragancia que mejor represente tu espacio o tu
              marca.
            </p>
          </div>
        </div>
      </section>

      {/* Distribución teaser */}
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-dark">
          ¿Tienes un negocio?
        </h2>
        <p className="max-w-xl font-body text-dark/70">
          Ayudamos a hoteles, spas, oficinas y tiendas a mejorar su identidad
          olfativa, con precios preferenciales por volumen.
        </p>
        <Link
          href="/distribucion"
          className="border border-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-dark transition hover:bg-dark hover:text-cream"
        >
          Conoce más
        </Link>
      </section>
    </div>
  );
}
