import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const { data } = await supabase
    .from("case_studies")
    .select("id, title, summary, cover_image, document_url, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <div className="page-wrapper">
      <header className="page-header-wide">
        <span className="section-label">CASE STUDIES</span>
        <h1 className="page-title">Case Studies</h1>
        <p className="page-subtitle">
          Real-world applications and outcomes
        </p>
      </header>

      <section className="case-grid">
        {data?.map((c) => (
          <article key={c.id} className="case-card">
            {c.cover_image && (
              <div className="case-cover">
                <img src={c.cover_image} alt={c.title} />
              </div>
            )}

            <div className="case-body">
              <span className="case-date">
                {new Date(c.created_at).toLocaleDateString()}
              </span>

              <h3 className="case-title">{c.title}</h3>

              {c.summary && (
                <p className="case-summary">{c.summary}</p>
              )}

              {c.document_url && (
                <a
                  href={c.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-cta"
                >
                  View Case Study →
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
