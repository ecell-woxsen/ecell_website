"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      const { error: signInError } = await authClient.signIn.email({
        email: username.trim().toLowerCase() + "@ecellwoxsen.internal",
        password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid username or password");
      } else {
        // Force full page reload/navigation to admin dashboard to trigger layout state sync
        window.location.href = "/admin";
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] card-pad bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] hover:border-[var(--green-lt)]/25 rounded-2xl transition-all duration-500 shadow-2xl relative overflow-hidden">
      {/* Sweep Effect */}
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.01] to-transparent -translate-x-full animate-[sweep_6s_ease-in-out_infinite] pointer-events-none" />

      <div className="relative z-10">
        <h2 className="font-['Bebas_Neue',sans-serif] text-[40px] tracking-wide text-white text-center mb-2">
          ADMIN ACCESS
        </h2>
        <p className="text-[12px] font-mono tracking-widest text-center text-white/40 uppercase mb-8">
          E-Cell Woxsen Portal
        </p>

        {error && (
          <div className="mb-6 p-3.5 bg-red-950/40 border border-red-500/20 text-red-400 text-[13px] rounded-xl text-center font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#080d1c]/60 border border-white/[0.08] rounded-xl text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors duration-300 font-light"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#080d1c]/60 border border-white/[0.08] rounded-xl text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors duration-300 font-light"
              placeholder="Enter password"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[var(--green)] hover:bg-[var(--green-mid)] text-white text-[12px] font-mono tracking-[0.2em] uppercase rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(76,175,98,0.2)]"
            >
              {isLoading ? "Authenticating..." : "Login →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
