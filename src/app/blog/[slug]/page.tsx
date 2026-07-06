import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts-store";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <span className="font-body text-xs uppercase tracking-widest text-dark/40">
        {new Date(post.date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <h1 className="mt-2 font-display text-3xl text-dark sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-8 flex flex-col gap-5 font-body text-dark/70">
        {post.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
