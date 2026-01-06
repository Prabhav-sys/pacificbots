"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setMounted(true);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link href="/" className="logo">
          <Image
            src="/logo-01.png"
            alt="Pacific Bots"
            width={60}
            height={45}
            priority
          />
          <span>Pacific Bots</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="nav-links">
          {[
            { href: "/", label: "Home" },
            { href: "/blogs", label: "Blogs" },
            { href: "/tutorials", label: "Tutorials" },
            { href: "/case-studies", label: "Case Studies" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">
          <ThemeToggle />

          {!user ? (
            <Link href="/auth" className="nav-link">
              Login
            </Link>
          ) : (
            <button
              className="nav-link"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
