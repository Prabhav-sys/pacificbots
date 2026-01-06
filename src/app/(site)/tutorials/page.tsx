import "@/styles/tutorials.css";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

/* -------------------------------
   YouTube URL → Embed converter
-------------------------------- */
function getYouTubeEmbedUrl(url: string | null) {
  if (!url) return null;

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

type Tutorial = {
  id: string;
  title: string;
  description: string | null;
  youtube_url: string | null;
  created_at: string;
};

export default async function TutorialsPage() {
  const { data: tutorials, error } = await supabase
    .from("tutorials")
    .select("id, title, description, youtube_url, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Tutorial fetch error:", error);
  }

  return (
    <div className="tutorials-page">
      {/* HEADER */}
      <header className="tutorials-header">
        <span className="section-label">LEARN</span>
        <h1>Tutorials</h1>
        <p>Video-first guides on robotics, automation, and engineering.</p>
      </header>

      {/* LIST */}
      <section className="tutorials-list">
        {tutorials && tutorials.length === 0 && (
          <p className="muted">No tutorials published yet.</p>
        )}

        {tutorials?.map((t) => {
          const embedUrl = getYouTubeEmbedUrl(t.youtube_url);

          return (
            <article key={t.id} className="tutorial-card">
              {/* VIDEO */}
              {embedUrl && (
                <div className="tutorial-video">
                  <iframe
                    src={embedUrl}
                    title={t.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* INFO */}
              <div className="tutorial-info">
                <h2>{t.title}</h2>

                {t.description && (
                  <p className="tutorial-desc">{t.description}</p>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
