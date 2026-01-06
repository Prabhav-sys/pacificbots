"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ===========================
     EMAIL AUTH
  ============================ */
  const handleEmailAuth = async () => {
    setLoading(true);
    setError(null);

    const action =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await action;

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
  };

  /* ===========================
     OAUTH
  ============================ */
  const handleOAuth = async (provider: "github" | "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>

        <p className="auth-desc">
          {mode === "signin"
            ? "Sign in to continue"
            : "Choose how you want to sign up"}
        </p>

        {/* SWITCH */}
        <div className="auth-switch">
          <button
            className={mode === "signin" ? "active" : ""}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* OAUTH OPTIONS */}
        {mode === "signup" && (
          <>
            <button
              className="auth-github"
              onClick={() => handleOAuth("github")}
            >
              Continue with GitHub
            </button>

            <button
              className="auth-github"
              onClick={() => handleOAuth("google")}
            >
              Continue with Google
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>
          </>
        )}

        {/* EMAIL / PASSWORD */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "#ef4444", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        <button
          className="auth-primary"
          onClick={handleEmailAuth}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "signin"
            ? "Sign In"
            : "Create Account"}
        </button>
      </div>
    </div>
  );
}
