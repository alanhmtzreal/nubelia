"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-dark px-5 py-2 font-body text-sm uppercase tracking-widest text-dark transition hover:bg-dark hover:text-cream"
    >
      Cerrar sesión
    </button>
  );
}
