"use client";

import { v4 as uuid } from "uuid";
import { supabase } from "@/lib/supabaseClient";

export type Block =
  | { id: string; type: "text"; value: string }
  | { id: string; type: "image"; value: string }
  | { id: string; type: "youtube"; value: string }
  | { id: string; type: "code"; value: string }
  | { id: string; type: "link"; value: string };

export default function ContentEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (b: Block[]) => void;
}) {
  const addBlock = (type: Block["type"]) =>
    onChange([...blocks, { id: uuid(), type, value: "" } as Block]);

  const update = (id: string, value: string) =>
    onChange(blocks.map(b => (b.id === id ? { ...b, value } : b)));

  const remove = (id: string) =>
    onChange(blocks.filter(b => b.id !== id));

  const move = (i: number, dir: number) => {
    const copy = [...blocks];
    const target = copy[i];
    copy.splice(i, 1);
    copy.splice(i + dir, 0, target);
    onChange(copy);
  };

  /* ===============================
     IMAGE UPLOAD (FIXED)
  =============================== */
  const uploadImage = async (file: File, id: string) => {
    const ext = file.name.split(".").pop();
    const path = `blogs/${id}-${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(path, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(path);

    update(id, data.publicUrl);
  };

  return (
    <div className="editor">
      <div className="editor-toolbar">
        <button onClick={() => addBlock("text")}>+ Text</button>
        <button onClick={() => addBlock("image")}>+ Image</button>
        <button onClick={() => addBlock("youtube")}>+ YouTube</button>
        <button onClick={() => addBlock("code")}>+ Code</button>
        <button onClick={() => addBlock("link")}>+ Link</button>
      </div>

      <div className="editor-blocks">
        {blocks.map((b, i) => (
          <div key={b.id} className="editor-block">
            <div className="editor-block-head">
              <span>{b.type.toUpperCase()}</span>
              <div>
                <button disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                <button disabled={i === blocks.length - 1} onClick={() => move(i, 1)}>↓</button>
                <button onClick={() => remove(b.id)}>✕</button>
              </div>
            </div>

            {b.type === "text" && (
              <textarea
                value={b.value}
                onChange={e => update(b.id, e.target.value)}
              />
            )}

            {b.type === "code" && (
              <textarea
                className="code"
                value={b.value}
                onChange={e => update(b.id, e.target.value)}
              />
            )}

            {b.type === "image" && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && uploadImage(e.target.files[0], b.id)
                  }
                />
                {b.value && (
                  <img
                    src={b.value}
                    alt="Uploaded"
                    style={{ marginTop: 8, maxWidth: "100%" }}
                  />
                )}
              </>
            )}

            {(b.type === "youtube" || b.type === "link") && (
              <input
                value={b.value}
                onChange={e => update(b.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
