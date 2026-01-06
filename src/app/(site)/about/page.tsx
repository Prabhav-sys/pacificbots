import "@/styles/about.css";

export default function AboutPage() {
  return (
    <section className="about-page">
      {/* HERO */}
      <header className="about-hero">
        <span className="about-label">ABOUT</span>
        <h2>Building intelligent systems <br />
          with clarity & purpose</h2>
        
        <p>
          Pacific Bots is a research-driven initiative focused on robotics,
          automation, and applied intelligence — bridging theory with
          real-world execution.
        </p>
      </header>

      {/* PHILOSOPHY */}
      <section className="about-section">
        <div className="about-text">
          <h2>Our Philosophy</h2>
          <p>
            We believe technology should be calm, understandable, and
            engineered with intent — not noise, not hype.
          </p>
          <p>
            Every tutorial, case study, and research note is designed to
            reduce complexity, not increase it.
          </p>
        </div>

        <div className="about-visual card-rounded">
          <img src="/tech-01.jpg" alt="Automation systems" />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="about-section reverse">
        <div className="about-visual card-angled">
          <img src="/tech-02.jpg" alt="Robotics engineering" />
        </div>

        <div className="about-text">
          <h2>What We Build</h2>
          <ul>
            <li>✔ Video-first robotics tutorials</li>
            <li>✔ Applied AI & automation workflows</li>
            <li>✔ Real-world case studies & outcomes</li>
          </ul>
        </div>
      </section>

      {/* VISUAL STRIP */}
      <section className="about-visual-grid">
        <img src="/tech-03.jpg" alt="Manufacturing automation" />
        <img src="/tech-04.jpg" alt="Industrial robotics" />
        <img src="/tech-05.jpg" alt="AI systems" />
        <img src="/tech-06.jpg" alt="Engineering lab" />
      </section>

      {/* VALUES */}
      <section className="about-values">
        <h2>Core Values</h2>

        <div className="values-grid">
          <div className="value-card">
            <h3>Clarity</h3>
            <p>Explain complex systems without unnecessary abstraction.</p>
          </div>

          <div className="value-card">
            <h3>Engineering First</h3>
            <p>Real systems, real constraints, real outcomes.</p>
          </div>

          <div className="value-card">
            <h3>Depth</h3>
            <p>We go deep where it matters — not wide.</p>
          </div>
        </div>
      </section>
    </section>
  );
}
