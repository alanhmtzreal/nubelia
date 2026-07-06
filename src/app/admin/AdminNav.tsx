"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Productos" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-2">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`border px-4 py-2 font-body text-xs uppercase tracking-widest transition ${
              active
                ? "border-dark bg-dark text-cream"
                : "border-dark/20 text-dark/70 hover:border-dark"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
