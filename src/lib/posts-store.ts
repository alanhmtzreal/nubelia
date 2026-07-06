import { Post } from "@/types/post";
import { getSupabaseClient } from "@/lib/supabase";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  sort_order: number;
}

function rowToPost(row: PostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    date: row.date,
  };
}

function postToRow(post: Post, sortOrder: number): PostRow {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    sort_order: sortOrder,
  };
}

export async function readPosts(): Promise<Post[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as PostRow[]).map(rowToPost);
}

export async function writePosts(posts: Post[]): Promise<void> {
  const supabase = getSupabaseClient();
  const rows = posts.map((p, index) => postToRow(p, index));

  const { error: deleteError } = await supabase.from("posts").delete().neq("slug", "");
  if (deleteError) throw new Error(deleteError.message);

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("posts").insert(rows);
    if (insertError) throw new Error(insertError.message);
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToPost(data as PostRow) : undefined;
}
