import Link from "next/link";
import { readPosts } from "@/lib/posts-store";
import LogoutButton from "../LogoutButton";
import AdminNav from "../AdminNav";
import DeletePostButton from "./DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await readPosts();

  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminNav />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-dark">Panel de blog</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/blog/nuevo"
              className="bg-dark px-5 py-2 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
            >
              + Nuevo post
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="flex flex-col divide-y divide-dark/10 border border-dark/10 bg-white/40">
          {posts.length === 0 && (
            <p className="px-5 py-8 font-body text-sm text-dark/50">
              Todavía no hay posts.
            </p>
          )}
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            >
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-dark/50">
                  {new Date(post.date).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="font-display text-lg text-dark">{post.title}</p>
                <p className="font-body text-sm text-dark/70 line-clamp-1">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/blog/${post.slug}`}
                  className="font-body text-sm text-dark/70 underline hover:text-dark"
                >
                  Editar
                </Link>
                <DeletePostButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
