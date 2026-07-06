import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readPosts, writePosts } from "@/lib/posts-store";

export async function GET() {
  const posts = await readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.slug || !body.title) {
    return NextResponse.json(
      { error: "Falta el slug o el título del post" },
      { status: 400 }
    );
  }

  const posts = await readPosts();
  if (posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json(
      { error: "Ya existe un post con ese identificador (slug)" },
      { status: 400 }
    );
  }

  posts.unshift(body);
  await writePosts(posts);
  return NextResponse.json({ ok: true });
}
