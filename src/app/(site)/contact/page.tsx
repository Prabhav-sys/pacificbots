"use client";

import "@/styles/contact.css";
import { useState } from "react";

/* ===============================
   Inline SVG Icons (No deps)
================================ */

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16v12H4z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 6l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 3h6l2 5-3 2a14 14 0 006 6l2-3 5 2v6c-10 0-18-8-18-18z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

/* ===============================
   Contact Page
================================ */

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact-page">
      {/* HERO */}
      <div className="contact-hero">
        <span className="contact-label">CONTACT</span>

        <h1 className="contact-title">
          Let’s build something <span>meaningful</span>
        </h1>

        <p className="contact-subtitle">
          Have a question, collaboration idea, or just want to say hello?
          Reach out — we read everything.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="contact-grid">
        {/* LEFT — INFO */}
        <div className="contact-info">
          <h2>Get in touch</h2>

          <p>
            Whether it’s research, automation, robotics, or collaboration —
            feel free to connect through any channel below.
          </p>

          <div className="contact-links">
            <a
              href="https://www.instagram.com/prashant._.kumar15/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <IconInstagram />
              <span>Instagram</span>
            </a>

            <a
              href="mailto:pacificbotsofficial@gmail.com"
              className="contact-link"
            >
              <IconMail />
              <span>pacificbotsofficial@gmail.com</span>
            </a>

            <a
              href="mailto:pkumarofficial02@gmail.com"
              className="contact-link"
            >
              <IconMail />
              <span>pkumarofficial02@gmail.com</span>
            </a>

            <div className="contact-link disabled">
              <IconPhone />
              <span>Phone: xxxxxx</span>
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="contact-form-card">
          <h3>Send a message</h3>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows={5}
                placeholder="Tell us what’s on your mind…"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="contact-btn" disabled={loading}>
              {loading ? "Sending…" : "Send message"}
            </button>

            {success && (
              <p className="contact-success">
                Message sent successfully.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
