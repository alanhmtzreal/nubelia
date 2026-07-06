import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseClient } from "@/lib/supabase";

interface UploadedFile {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

function isUploadedFile(value: unknown): value is UploadedFile {
  return (
    !!value &&
    typeof value === "object" &&
    "arrayBuffer" in value &&
    typeof (value as UploadedFile).arrayBuffer === "function"
  );
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!isUploadedFile(file)) {
    return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "El archivo debe ser una imagen" },
      { status: 400 }
    );
  }

  const extension = file.name.split(".").pop() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = getSupabaseClient();
  const { error } = await supabase.storage
    .from("product-images")
    .upload(safeName, buffer, {
      contentType: file.type,
      cacheControl: "3600",
    });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo subir la imagen: " + error.message },
      { status: 502 }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(safeName);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
