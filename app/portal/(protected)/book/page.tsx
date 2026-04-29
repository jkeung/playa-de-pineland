import { createClient } from "@/lib/supabase/server";
import { cancelClassRegistration, registerForClass } from "@/app/portal/actions";

const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const levelLabels: Record<string, string> = { B: "Beginner", BB: "Intermediate", A: "Advanced", AA: "Elite" };

export default async function BookSession({
  searchParams,
}: {
  searchParams?: Promise<{ session?: string; focus?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedSessionId = resolvedSearchParams?.session;
  const focus = resolvedSearchParams?.focus?.toLowerCase();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: sessions } = await supabase
    .from("class_sessions")
    .select("id,title,description,day_of_week,start_time,level,capacity,class_registrations(user_id,profiles!class_registrations_user_id_fkey(display_name))")
    .eq("is_active", true)
    .order("day_of_week", { ascending: true });

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          Sign Up for a Class
        </h1>
        <p className="m-0 text-[color:var(--muted)] text-base">Reserve your spot. Players who sign up are shown on the public schedule.</p>
      </section>

      <div className="grid gap-4">
        {(sessions ?? []).map((session: any) => {
          const attendees = (session.class_registrations ?? []).map((r: any) => r.profiles?.display_name || "Player");
          const isRegistered = (session.class_registrations ?? []).some((r: any) => r.user_id === user?.id);
          const isFull = attendees.length >= session.capacity;
          const matchesFocus = focus ? session.title.toLowerCase().includes(focus) : false;
          const isSelected = selectedSessionId === session.id || (!selectedSessionId && matchesFocus);

          return (
            <article key={session.id} className={`card p-5 ${isSelected ? "ring-2 ring-[var(--sunset)]" : ""}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="m-0 mb-1 text-xl text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">{session.title}</h2>
                  <p className="m-0 text-[color:var(--muted)]">{dayLabels[session.day_of_week]} at {session.start_time.slice(0, 5)} · {levelLabels[session.level] || session.level}</p>
                  <p className="m-0 mt-2 text-[0.95rem] text-[color:var(--muted)]">{session.description}</p>
                  <p className="m-0 mt-2 text-[0.9rem]">{attendees.length}/{session.capacity} spots filled</p>
                  <p className="m-0 mt-1 text-[0.85rem] text-[color:var(--muted)]">Players: {attendees.length ? attendees.join(", ") : "No signups yet"}</p>
                </div>

                {isRegistered ? (
                  <form action={cancelClassRegistration.bind(null, session.id)}>
                    <button className="btn btn-secondary" type="submit">Cancel</button>
                  </form>
                ) : (
                  <form action={registerForClass.bind(null, session.id)}>
                    <button className="btn btn-primary" type="submit" disabled={isFull}>Sign Up</button>
                  </form>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
