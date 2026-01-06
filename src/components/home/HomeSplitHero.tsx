"use client";

import LabScene from "./LabScene";

export default function HomeSplitHero() {
  return (
    <section className="home-split-hero">
      <div className="container split-grid">
        {/* LEFT — FREE 3D STAGE */}
        <div className="free-3d-stage">
          <LabScene />
        </div>

        {/* RIGHT — BRAND COPY */}
        <div className="hero-copy">
          <h1 className="hero-brand">
             <span>PACIFIC BOTS</span>
          </h1>

          <p className="hero-tagline">
            Robotics · Automation · Applied Intelligence
          </p>

          <div className="hero-divider">
            <span />
            <span />
            <span />
          </div>

          <p className="hero-description">
            A research-driven robotics lab focused on building calm, reliable
            autonomous systems — from code to motion.
          </p>

          
        </div>
      </div>
    </section>
  );
}
