"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace("/admin");
    });
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) return setError(error.message);

    router.push("/admin");
  };

  return (
    <div className="admin-login-root">
      <div className="admin-login-card">
        <h1>Admin Access</h1>
        <p>Restricted access</p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </div>
    </div>
  );
}
