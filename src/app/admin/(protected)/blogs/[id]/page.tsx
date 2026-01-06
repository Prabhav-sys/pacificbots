"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Block = {
  id: string;
  type: "text" | "image" | "youtube" | "code";
  value: string;
};

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  /* ----------------------------------------
     LOAD EXISTING BLOG
  ---------------------------------------- */
  useEffect(() => {
    if (!id) return;

    supabase
      .from("posts")
      .select("title, status, content_blocks")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        setTitle(data.title ?? "");
        setStatus(data.status ?? "draft");
        setBlocks(data.content_blocks ?? []);
      });
  }, [id]);

  /* ----------------------------------------
     ADD BLOCK
  ---------------------------------------- */
  const addBlock = (type: Block["type"]) => {
    setBlocks([
      ...blocks,
      { id: crypto.randomUUID(), type, value: "" },
    ]);
  };

  /* ----------------------------------------
     UPDATE BLOCK
  ---------------------------------------- */
  const updateBlock = (index: number, value: string) => {
    const copy = [...blocks];
    copy[index].value = value;
    setBlocks(copy);
  };

  /* ----------------------------------------
     REMOVE BLOCK
  ---------------------------------------- */
  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  /* ----------------------------------------
     IMAGE UPLOAD
  ---------------------------------------- */
  const uploadImage = async (file: File, index: number) => {
    const ext = file.name.split(".").pop();
    const path = `blogs/${id}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(path, file, { upsert: true });

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(path);

    updateBlock(index, data.publicUrl);
  };

  /* ----------------------------------------
     SAVE BLOG
  ---------------------------------------- */
  const saveBlog = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        status,
        content_blocks: blocks,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Blog saved");
  };

  /* ----------------------------------------
     UI
  ---------------------------------------- */
  return (
    <div className="editor-shell">
      <div className="max-w-3xl space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <input
            className="editor-input text-xl font-semibold"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="editor-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button
          onClick={saveBlog}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>

        {/* ADD BLOCKS */}
        <div className="editor-tools">
          <button onClick={() => addBlock("text")}>+ Text</button>
          <button onClick={() => addBlock("image")}>+ Image</button>
          <button onClick={() => addBlock("youtube")}>+ YouTube</button>
          <button onClick={() => addBlock("code")}>+ Code</button>
        </div>

        {/* BLOCKS */}
        <div className="editor-blocks">
          {blocks.map((block, index) => (
            <div key={block.id} className="block-card">

              {block.type === "text" && (
                <textarea
                  className="editor-textarea"
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              )}

              {block.type === "image" && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files &&
                      uploadImage(e.target.files[0], index)
                    }
                  />
                  {block.value && (
                    <img
                      src={block.value}
                      className="mt-3 max-h-64 rounded"
                    />
                  )}
                </>
              )}

              {block.type === "youtube" && (
                <input
                  className="editor-input"
                  placeholder="YouTube link"
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              )}

              {block.type === "code" && (
                <textarea
                  className="editor-textarea code"
                  rows={6}
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              )}

              <button
                className="block-danger mt-2"
                onClick={() => removeBlock(index)}
              >
                Remove block
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
