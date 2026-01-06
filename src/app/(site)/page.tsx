import HeroSlider from "@/components/home/_HeroSlider";
import SplitHero from "@/components/home/HomeSplitHero";
import RobotScene from "@/components/home/RobotScene";
import RecentTimeline from "@/components/home/RecentTimeline";



export default function HomePage() {
  return (
    <>
      {/* HERO SLIDER (DO NOT DELETE) */}
      <HeroSlider />

      {/* SPLIT HERO */}
      <SplitHero />

      {/* MAIN CONTENT (UNCHANGED) */}
      <section className="container">
        <div className="hero-grid">
          {/* LEFT CONTENT */}
          <div>


            <h1 className="hero-title">
              A place to learn{" "}
              <span style={{ color: "var(--accent)" }}>AI</span>,{" "}
              <span style={{ color: "var(--accent-secondary)" }}>
                automation
              </span>{" "}
              and robotics.
            </h1>
            <p className="muted mb-3">
              Robotics and automation are projected to reshape manufacturing,
              healthcare, and intelligence systems within this decade.
            </p>

            <p className="hero-desc">
              This platform documents practical learning in robotics and artificial
              intelligence — from daily experiments and tutorials to long-form case
              studies, code snippets, simulations, images, and videos.
              Built as a knowledge base, not a showcase.
            </p>

          </div>

          {/* ✅ SECONDAR Y ROBOT STAGE */}
          <div className="secondary-robot-stage">
            <RobotScene url="/models/robot-02.glb" />
          </div>
        </div>
        {/* RECENT POSTS */}
        <section className="recent-posts">
          
          {/* TIMELINE LOGBOOK */}
          <RecentTimeline />

        </section>

      </section>
    </>
  );
}
