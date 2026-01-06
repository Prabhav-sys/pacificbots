"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;

    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀︎" : "☾"}
    </button>
  );
}
