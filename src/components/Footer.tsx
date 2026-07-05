import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/marca/logo-blanco.png"
            alt="Nubelia — Marketing Olfativo"
            width={140}
            height={70}
            className="h-14 w-auto object-contain"
          />
          <p className="mt-4 max-w-xs font-body text-sm text-cream/70">
            Marketing olfativo para hogares y negocios: turbos ambientadores,
            room spray y difusores.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm uppercase tracking-widest text-cream/90">
            Navegación
          </h4>
          <ul className="space-y-2 font-body text-sm text-cream/70">
            <li><Link href="/nosotros" className="hover:text-cream">Nosotros</Link></li>
            <li><Link href="/servicios" className="hover:text-cream">Servicios</Link></li>
            <li><Link href="/distribucion" className="hover:text-cream">Distribución</Link></li>
            <li><Link href="/tienda" className="hover:text-cream">Tienda</Link></li>
            <li><Link href="/blog" className="hover:text-cream">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm uppercase tracking-widest text-cream/90">
            Contacto
          </h4>
          <ul className="space-y-2 font-body text-sm text-cream/70">
            <li>WhatsApp: 833 205 1214</li>
            <li>hola@nubelia.mx</li>
            <li>Tampico, Tamaulipas</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm uppercase tracking-widest text-cream/90">
            Síguenos
          </h4>
          <ul className="space-y-2 font-body text-sm text-cream/70">
            <li>
              <a
                href="https://www.instagram.com/nubelia.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61581416241543"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center font-body text-xs text-cream/50">
        © {new Date().getFullYear()} Nubelia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
