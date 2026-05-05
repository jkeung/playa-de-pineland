import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClassCalendarManager from "@/components/portal/ClassCalendarManager";

export default async function ClassAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ selected?: string; error?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user!.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/portal");
  }

  const { data: sessions } = await supabase
    .from("class_sessions")
    .select("id,title,description,session_date,day_of_week,start_time,end_time,level,capacity,is_active")
    .order("session_date", { ascending: true })
    .order("start_time", { ascending: true });

  const { data: registrations } = await supabase
    .from("class_registrations")
    .select("id,class_session_id,created_at,profiles(display_name)")
    .order("created_at", { ascending: true });

  const registrationsBySession = new Map<string, { id: string; display_name: string }[]>();
  for (const registration of registrations ?? []) {
    const attendeeProfile = (registration as {
      profiles?: { display_name?: string } | null;
    }).profiles;

    const attendeeList = registrationsBySession.get(registration.class_session_id) ?? [];
    attendeeList.push({
      id: registration.id,
      display_name: attendeeProfile?.display_name || "Player",
    });
    registrationsBySession.set(registration.class_session_id, attendeeList);
  }

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          Manage Calendar Events
        </h1>
        <p className="m-0 text-[color:var(--muted)] text-base">Admins can create or remove class events shown on the public calendar.</p>
      </section>

      <ClassCalendarManager
        sessions={sessions ?? []}
        registrationsBySession={Object.fromEntries(registrationsBySession.entries())}
        selectedSessionId={resolvedSearchParams?.selected}
        error={resolvedSearchParams?.error}
      />
    </div>
  );
}
