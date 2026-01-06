"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewCaseStudyPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File, bucket: string) => {
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async () => {
    if (!title || !documentFile) {
      alert("Title and PDF are required");
      return;
    }

    setLoading(true);

    try {
      const documentUrl = await uploadFile(documentFile, "case-study-pdfs");
      const coverImageUrl = coverImage
        ? await uploadFile(coverImage, "case-study-covers")
        : null;

      await supabase.from("case_studies").insert({
        title,
        summary,
        document_url: documentUrl,
        cover_image: coverImageUrl,
        status,
      });

      router.push("/admin/case-studies");
    } catch (e) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form">
      <h1>New Case Study</h1>

      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Summary</label>
        <textarea
          rows={4}
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Cover Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setCoverImage(e.target.files?.[0] || null)}
        />
      </div>

      <div className="form-group">
        <label>PDF Document *</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setDocumentFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button onClick={save} disabled={loading} className="admin-btn primary">
        {loading ? "Saving..." : "Save Case Study"}
      </button>
    </div>
  );
}
