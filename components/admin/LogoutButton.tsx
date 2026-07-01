"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Failed to sign out", e);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-red-950/20 border border-white/[0.08] hover:border-red-500/30 text-white/50 hover:text-red-400 font-mono text-[10px] tracking-wider uppercase rounded-lg transition-all cursor-pointer"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Log Out
    </button>
  );
}
