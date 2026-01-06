"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md rounded-2xl
                     border border-white/10 bg-[var(--bg-elevated)]
                     p-6 shadow-2xl"
        >
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sign in to Pacific Bots
          </h2>

          <Auth
            supabaseClient={supabase}
            view="sign_in"
            providers={["google", "github"]}
            magicLink={true}
            showLinks={false}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "var(--accent-primary)",
                    brandAccent: "var(--accent-secondary)",
                  },
                  radii: {
                    borderRadiusButton: "12px",
                    inputBorderRadius: "12px",
                  },
                },
              },
            }}
          />

          <button
            onClick={onClose}
            className="mt-5 w-full rounded-md border border-[var(--border)]
                       py-2 text-sm text-[var(--muted)]
                       hover:bg-[var(--bg-focus)] transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
