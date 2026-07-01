import { notFound } from "next/navigation";
import { Metadata } from "next";
import LoginForm from "./LoginForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== process.env.ADMIN_LOGIN_PATH) {
    return {};
  }
  return {
    title: "E-Cell Woxsen — Portal",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SecretLoginPage({ params }: PageProps) {
  const { slug } = await params;

  // Render a silent 404 if the slug does not match the configured path slug
  if (slug !== process.env.ADMIN_LOGIN_PATH) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Mesh Gradients to match E-Cell events page style */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,47,94,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,47,94,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[var(--green)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[var(--navy)]/10 rounded-full blur-[140px] pointer-events-none" />

      <LoginForm />
    </div>
  );
}
