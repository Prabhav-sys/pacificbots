"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function EditCaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  const [existingDocument, setExistingDocument] = useState<string | null>(null);
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("case_studies")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        setTitle(data.title);
        setSummary(data.summary ?? "");
        setExistingCover(data.cover_image ?? null);
        setExistingDocument(data.document_url ?? null);
        setStatus(data.status);
      });
  }, [id]);

  const uploadFile = async (file: File, bucket: string) => {
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const update = async () => {
    setLoading(true);

    try {
      let coverUrl = existingCover;
      let documentUrl = existingDocument;

      if (coverImage) {
        coverUrl = await uploadFile(coverImage, "case-study-covers");
      }

      if (documentFile) {
        documentUrl = await uploadFile(documentFile, "case-study-pdfs");
      }

      await supabase
        .from("case_studies")
        .update({
          title,
          summary,
          cover_image: coverUrl,
          document_url: documentUrl,
          status,
        })
        .eq("id", id);

      router.push("/admin/case-studies");
    } catch (e) {
      alert("Update failed");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form">
      <h1>Edit Case Study</h1>

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
        <label>Replace Cover Image</label>
        {existingCover && (
          <p className="text-sm opacity-60">Current image exists</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => setCoverImage(e.target.files?.[0] || null)}
        />
      </div>

      <div className="form-group">
        <label>Replace PDF Document</label>
        {existingDocument && (
          <p className="text-sm opacity-60">Current PDF exists</p>
        )}
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

      <button
        onClick={update}
        disabled={loading}
        className="admin-btn primary"
      >
        {loading ? "Updating..." : "Update Case Study"}
      </button>
    </div>
  );
}
