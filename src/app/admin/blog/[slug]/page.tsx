import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts-store";
import PostForm from "../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <h1 className="mx-auto mb-8 max-w-2xl font-display text-3xl text-dark">
        Editar: {post.title}
      </h1>
      <PostForm initialPost={post} />
    </div>
  );
}
