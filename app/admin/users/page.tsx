import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import AdminUsersClient from "./AdminUsersClient";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  let admin = null;
  try {
    admin = await fetchAuthQuery(
      api.admin.getCurrentAdmin,
      {}
    );
  } catch (e) {
    // Ignore and fall through to notFound
  }

  if (!admin || admin.role !== "president" || !admin.isActive) {
    notFound();
  }

  return <AdminUsersClient />;
}
