import PostForm from "../PostForm";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <h1 className="mx-auto mb-8 max-w-2xl font-display text-3xl text-dark">
        Nuevo post
      </h1>
      <PostForm />
    </div>
  );
}
