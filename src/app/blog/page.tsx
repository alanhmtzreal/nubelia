import type { Metadata } from "next";
import Link from "next/link";
import { readPosts } from "@/lib/posts-store";

export const metadata: Metadata = {
  title: "Blog | Nubelia",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await readPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
        Nubelia
      </p>
      <h1 className="mt-2 font-display text-4xl text-dark">Blog</h1>

      <div className="mt-12 flex flex-col gap-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border-b border-dark/10 pb-8"
          >
            <span className="font-body text-xs uppercase tracking-widest text-dark/40">
              {new Date(post.date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <h2 className="mt-2 font-display text-2xl text-dark">
              {post.title}
            </h2>
            <p className="mt-3 font-body text-dark/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
