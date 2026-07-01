export function formatPrice(price: number | null): string {
  if (price === null) return "Consultar precio";
  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}
