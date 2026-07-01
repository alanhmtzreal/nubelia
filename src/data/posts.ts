export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
}

export const posts: Post[] = [
  {
    slug: "por-que-el-aroma-de-tu-negocio-importa",
    title: "Por qué el aroma de tu negocio importa",
    excerpt:
      "El olfato es el sentido más ligado a la memoria: descubre cómo un aroma puede hacer que tus clientes recuerden tu marca.",
    content: [
      "El olfato está directamente conectado con las zonas del cerebro que procesan la memoria y las emociones, mucho más que cualquier otro sentido.",
      "Por eso, cuando un negocio cuida su identidad olfativa, no solo mejora la experiencia del espacio: crea una asociación emocional duradera con la marca.",
    ],
    date: "2026-05-10",
  },
  {
    slug: "como-elegir-el-aroma-ideal-para-tu-hogar",
    title: "Cómo elegir el aroma ideal para tu hogar",
    excerpt:
      "No todos los espacios piden el mismo tipo de fragancia. Te compartimos algunas ideas para encontrar el aroma perfecto.",
    content: [
      "La sala, la habitación y el baño no necesitan el mismo tipo de aroma: la intensidad y la familia olfativa deben adaptarse al uso del espacio.",
      "Aromas cítricos y frescos funcionan bien en espacios sociales, mientras que notas amaderadas o vainilla suelen ser ideales para habitaciones.",
    ],
    date: "2026-04-02",
  },
];

export const getPostBySlug = (slug: string) =>
  posts.find((p) => p.slug === slug);
