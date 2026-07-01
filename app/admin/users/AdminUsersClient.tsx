"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminUsersClient() {
  const currentAdmin = useQuery(api.admin.getCurrentAdmin);
  const admins = useQuery(api.admin.listAdminUsers);
  
  const createAdmin = useMutation(api.admin.createAdminUser);
  const updateAdmin = useMutation(api.admin.updateAdminUser);

  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"president" | "department_head">("department_head");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (admins === undefined || currentAdmin === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase">
          Loading credentials database...
        </div>
      </div>
    );
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMsg("");

      await createAdmin({
        username,
        password,
        name,
        role,
      });

      setUsername("");
      setPassword("");
      setName("");
      setRole("department_head");
      setSuccessMsg("Administrator account registered successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create administrator account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (admin: any) => {
    try {
      await updateAdmin({
        id: admin._id,
        role: admin.role,
        isActive: !admin.isActive,
      });
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
    }
  };

  const handleRoleChange = async (admin: any, newRole: "president" | "department_head") => {
    try {
      await updateAdmin({
        id: admin._id,
        role: newRole,
        isActive: admin.isActive,
      });
    } catch (err: any) {
      alert(err.message || "Failed to update role.");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 max-xl:grid-cols-1 animate-fade-in">
      {/* List section */}
      <div className="col-span-2 space-y-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-2">
            Presidential Controls
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-white">
            Administrative Accounts
          </h1>
        </div>

        <div className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                  <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Name / User</th>
                  <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-center">Role</th>
                  <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-center">Status</th>
                  <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-[13.5px] font-sans">
                {admins.map((admin) => {
                  const isSelf = currentAdmin ? admin.userId === currentAdmin.userId : false;
                  return (
                    <tr key={admin._id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4.5">
                        <div className="font-medium text-white flex items-center gap-2">
                          {admin.name}
                          {isSelf && (
                            <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] font-mono uppercase text-white/50 rounded">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-white/30 mt-0.5">
                          @{admin.username}
                        </div>
                      </td>
                      <td className="p-4.5 text-center">
                        {isSelf ? (
                          <span className="inline-block px-2.5 py-1 bg-[rgba(196,170,255,0.08)] border border-[rgba(196,170,255,0.22)] text-[10px] font-mono tracking-wider uppercase text-[#C4AAFF] rounded-full">
                            {admin.role.replace("_", " ")}
                          </span>
                        ) : (
                          <select
                            value={admin.role}
                            onChange={(e) => handleRoleChange(admin, e.target.value as any)}
                            className="bg-[#020817] border border-white/[0.08] px-2 py-1 rounded-md text-[11px] font-mono text-white/80 focus:outline-none"
                          >
                            <option value="president">President</option>
                            <option value="department_head">Dept Head</option>
                          </select>
                        )}
                      </td>
                      <td className="p-4.5 text-center">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-full ${
                          admin.isActive
                            ? "bg-[rgba(76,175,98,0.08)] border border-[rgba(76,175,98,0.22)] text-[var(--green-lt)]"
                            : "bg-white/[0.02] border border-white/[0.08] text-white/20"
                        }`}>
                          {admin.isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="p-4.5 text-right">
                        <button
                          disabled={isSelf}
                          onClick={() => handleToggleActive(admin)}
                          className={`px-3 py-1.5 border font-mono text-[9px] uppercase rounded-lg transition-all cursor-pointer ${
                            isSelf
                              ? "bg-transparent border-white/[0.04] text-white/10 cursor-not-allowed"
                              : admin.isActive
                              ? "bg-transparent border-white/[0.08] text-white/60 hover:text-red-400 hover:border-red-500/30 hover:bg-red-950/10"
                              : "bg-[var(--green)]/10 border-[var(--green-lt)]/30 text-[var(--green-lt)] hover:bg-[var(--green)]/20"
                          }`}
                        >
                          {admin.isActive ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Creation form */}
      <div className="space-y-6">
        <div>
          <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-white">
            Register Administrator
          </h2>
          <p className="text-[10px] font-mono text-white/35 uppercase tracking-wider">
            Provision credential set
          </p>
        </div>

        <form onSubmit={handleCreateUser} className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 text-[12px] rounded-xl text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[12px] rounded-xl text-center">
              {successMsg}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="e.g. Aditi Patel"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] font-mono focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="e.g. aditi_ecell"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] font-mono focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-[10px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
            >
              <option value="department_head">Department Head</option>
              <option value="president">President</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[var(--green)] hover:bg-[var(--green-mid)] text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(76,175,98,0.25)] disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
