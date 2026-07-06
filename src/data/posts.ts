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
      "El olfato está directamente conectado con las zonas del cerebro que procesan la memoria y las emociones, mucho más que cualquier otro sentido. Una imagen o un sonido pasan primero por otras regiones del cerebro antes de generar una emoción; un aroma llega casi directo al sistema límbico, la parte que guarda nuestros recuerdos más profundos.",
      "Por eso, cuando un negocio cuida su identidad olfativa, no solo mejora la experiencia del espacio: crea una asociación emocional duradera con la marca. Piensa en la última vez que un olor te transportó de golpe a un lugar o un momento específico: eso es exactamente lo que buscamos lograr cuando ayudamos a un negocio a encontrar su aroma.",
      "A esto se le conoce como marketing olfativo, y cada vez más marcas —desde hoteles boutique hasta tiendas de ropa— lo usan de forma intencional. No es casualidad que ciertas tiendas de ropa, salas de cine o cadenas hoteleras tengan un aroma tan característico que podrías reconocer el lugar con los ojos cerrados.",
      "Los beneficios van más allá de lo emocional. Un ambiente bien aromatizado también transmite orden, limpieza y cuidado, lo cual influye directamente en la percepción de calidad que tiene un cliente sobre tu negocio, incluso antes de ver el producto o servicio que ofreces.",
      "En Nubelia trabajamos con negocios que quieren dar ese siguiente paso: pasar de simplemente 'que no huela mal' a construir una fragancia propia, reconocible y memorable. Nuestros difusores y esencias están pensados justamente para mantener esa presencia constante, sin que el aroma se sienta invasivo.",
      "Si tienes un negocio y quieres explorar cómo se vería (u olería) tu identidad olfativa, en la sección de Distribución te contamos cómo trabajamos con negocios como el tuyo.",
    ],
    date: "2026-05-10",
  },
  {
    slug: "como-elegir-el-aroma-ideal-para-tu-hogar",
    title: "Cómo elegir el aroma ideal para tu hogar",
    excerpt:
      "No todos los espacios piden el mismo tipo de fragancia. Te compartimos algunas ideas para encontrar el aroma perfecto.",
    content: [
      "La sala, la habitación y el baño no necesitan el mismo tipo de aroma: la intensidad y la familia olfativa deben adaptarse al uso del espacio. Un aroma que funciona perfecto en la entrada de tu casa puede sentirse demasiado fuerte en una recámara donde pasas horas durmiendo.",
      "Para espacios sociales como la sala o el comedor, los aromas cítricos y frescos (como los que encuentras en nuestra línea de Room Spray) funcionan muy bien porque se perciben como energizantes y limpios, ideales para cuando reciben visitas o simplemente quieren un ambiente ligero durante el día.",
      "En las habitaciones, en cambio, buscamos algo distinto: notas amaderadas, vainilla o florales suaves ayudan a crear una sensación de calma, algo importante en el espacio donde descansamos. Evita aromas demasiado intensos o cítricos en la recámara, ya que pueden sentirse estimulantes en vez de relajantes.",
      "El baño es un caso especial: al ser un espacio pequeño y cerrado, conviene un aroma neutro o fresco, aplicado con moderación. Aquí es donde un Turbo Ambientador rinde muy bien, porque con una sola pulsación cubre el espacio sin saturarlo.",
      "Una recomendación práctica: si tienes un hogar de varios ambientes, no uses el mismo aroma en todos lados. Variar las fragancias por zona ayuda a que cada espacio se sienta distinto y evita que 'te acostumbres' al olor, que es lo que pasa cuando un mismo aroma está presente todo el tiempo en todos lados.",
      "Si no sabes por dónde empezar, en Nubelia tenemos un catálogo amplio de aromas para Turbo, Room Spray y difusores — escríbenos y con gusto te ayudamos a armar la combinación ideal para tu hogar.",
    ],
    date: "2026-04-02",
  },
];

export const getPostBySlug = (slug: string) =>
  posts.find((p) => p.slug === slug);
