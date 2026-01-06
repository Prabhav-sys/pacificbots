"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function NewBlog() {
  const router = useRouter();

  useEffect(() => {
    const create = async () => {
      const title = "Untitled Blog";

      const { data, error } = await supabase
        .from("posts")
        .insert({
          title,
          slug: `${slugify(title)}-${Date.now()}`, // unique slug
          type: "blog",
          status: "draft",

          // ✅ REQUIRED FOR DB CONSTRAINT
          content: "",

          // ✅ NEW CMS SYSTEM
          content_blocks: [],
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      router.replace(`/admin/blogs/${data.id}`);
    };

    create();
  }, [router]);

  return null;
}
