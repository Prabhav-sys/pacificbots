"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  { image: "/tech-01.jpg", title: "Pacific Bots is Live" },
  { image: "/tech-02.jpg", title: "Building Robotics, Calmly" },
  { image: "/tech-03.jpg", title: "Engineering Autonomous Futures" },
  { image: "/tech-04.jpg", title: "From Code to Motion" },
  { image: "/tech-05.jpg", title: "Robotics Without Noise" },
  { image: "/tech-06.jpg", title: "Inspired by Tranquility" },
  
  { image: "/tech-01.jpg", title: "Pacific Bots is Live" },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === slides.length - 1) {
          // 🔥 HARD RESET — NO ANIMATION
          const track = trackRef.current;
          if (track) {
            track.style.transition = "none";
            track.style.transform = "translateX(0%)";
            track.offsetHeight; // force reflow
            track.style.transition = "transform 0.8s ease-in-out";
          }
          return 0;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">
      <div
        ref={trackRef}
        className="hero-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="hero-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="hero-label">LATEST FROM PACIFIC BOTS</span>
              <h1>{slide.title}</h1>
              <p>Inspired by tranquility. Built for robotics.</p>
              <Link href="/blogs" className="hero-btn">
                Explore Blog
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
