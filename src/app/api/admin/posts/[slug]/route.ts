import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readPosts, writePosts } from "@/lib/posts-store";

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const posts = await readPosts();
  const index = posts.findIndex((p) => p.slug === params.slug);

  if (index === -1) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  posts[index] = { ...body, slug: params.slug };
  await writePosts(posts);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const posts = await readPosts();
  const filtered = posts.filter((p) => p.slug !== params.slug);

  if (filtered.length === posts.length) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  await writePosts(filtered);
  return NextResponse.json({ ok: true });
}
