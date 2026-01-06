"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/* ===============================
   Helpers
================================ */

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function EditTutorialPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [loading, setLoading] = useState(false);

  /* ===============================
     Load existing tutorial
  ================================ */
  useEffect(() => {
    if (isNew) return;

    supabase
      .from("tutorials")
      .select("title, description, youtube_url, status")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (!data) return;

        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setYoutubeUrl(data.youtube_url ?? "");
        setStatus(data.status ?? "draft");
      });
  }, [id, isNew]);

  /* ===============================
     Save
  ================================ */
  const save = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!youtubeUrl.trim()) {
      alert("YouTube URL is required");
      return;
    }

    setLoading(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      youtube_url: youtubeUrl.trim(),
      status,
    };

    if (isNew) {
      await supabase.from("tutorials").insert(payload);
    } else {
      await supabase.from("tutorials").update(payload).eq("id", id);
    }

    router.push("/admin/tutorials");
  };

  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

  /* ===============================
     Render
  ================================ */
  return (
    <div className="page editor-shell">
      <h1>{isNew ? "New Tutorial" : "Edit Tutorial"}</h1>

      {/* Title */}
      <div className="editor-group">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tutorial title"
        />
      </div>

      {/* Description */}
      <div className="editor-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description shown on the site"
        />
      </div>

      {/* YouTube */}
      <div className="editor-group">
        <label>YouTube URL</label>
        <input
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />

        {/* Preview (UX only) */}
        {embedUrl && (
          <div style={{ marginTop: "12px", maxWidth: 420 }}>
            <iframe
              src={embedUrl}
              title="Preview"
              allowFullScreen
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </div>
        )}
      </div>

      {/* Status */}
      <div className="editor-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "draft" | "published")
          }
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Save */}
      <button
        onClick={save}
        className="btn-primary"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Tutorial"}
      </button>
    </div>
  );
}
