export type ProductCategory =
  | "turbo"
  | "room-spray"
  | "difusor"
  | "difusor-chico"
  | "linea-economica";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number | null; // null => "Consultar precio"
  image: string; // ruta dentro de /public
  shortDescription: string;
  description: string[];
  specs?: string[];
  aromas?: string[];
  featured?: boolean;
}

export const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "turbo", label: "Turbo" },
  { value: "room-spray", label: "Room Spray" },
  { value: "difusor", label: "Difusor" },
  { value: "difusor-chico", label: "Difusor Chico" },
  { value: "linea-economica", label: "Línea económica" },
];
