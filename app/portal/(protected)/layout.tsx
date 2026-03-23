import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalNav from "@/components/portal/PortalNav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();

  return (
    <>
      <PortalNav displayName={profile?.display_name || ""} />
      <main className="portal-main">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
}
