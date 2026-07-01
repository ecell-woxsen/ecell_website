import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let admin = null;
  try {
    admin = await fetchAuthQuery(
      api.admin.getCurrentAdmin,
      {}
    );
  } catch (e) {
    // Ignore and fall through to notFound
  }

  if (!admin || !admin.isActive) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.06] bg-[#050b18] flex flex-col justify-between shrink-0 max-md:hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded bg-[var(--green)] flex items-center justify-center font-['Bebas_Neue',sans-serif] text-lg text-white">
              E
            </div>
            <div>
              <h2 className="font-['Bebas_Neue',sans-serif] text-xl tracking-wider text-white">
                Admin Portal
              </h2>
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                E-Cell Woxsen
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.03] text-[13px] font-mono uppercase tracking-wider transition-all"
            >
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.03] text-[13px] font-mono uppercase tracking-wider transition-all"
            >
              <span>Events</span>
            </Link>
            <Link
              href="/admin/registrations"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.03] text-[13px] font-mono uppercase tracking-wider transition-all"
            >
              <span>Registrations</span>
            </Link>
            {admin.role === "president" && (
              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.03] text-[13px] font-mono uppercase tracking-wider transition-all"
              >
                <span>Administrators</span>
              </Link>
            )}
          </nav>
        </div>

        {/* User Card */}
        <div className="p-6 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-[var(--green-lt)] uppercase">
              {admin.name.substring(0, 2)}
            </div>
            <div className="overflow-hidden font-sans">
              <p className="text-[12px] font-medium text-white truncate">{admin.name}</p>
              <p className="text-[9px] font-mono text-white/35 uppercase truncate tracking-wider">
                {admin.role.replace("_", " ")}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/[0.04] bg-[#050b18]/60 backdrop-blur-md px-8 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3">
            <h2 className="font-['Bebas_Neue',sans-serif] text-xl tracking-wider text-white">
              E-Cell Admin
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="text-[11px] font-mono text-white/60 uppercase">Overview</Link>
            <Link href="/admin/events" className="text-[11px] font-mono text-white/60 uppercase">Events</Link>
            <Link href="/admin/registrations" className="text-[11px] font-mono text-white/60 uppercase">Regs</Link>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto max-sm:p-4 bg-[#020817]">
          {children}
        </main>
      </div>
    </div>
  );
}
