import { createClient } from "@/lib/supabase/server";
import { cancelClassRegistration, registerForClass } from "@/app/portal/actions";

const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const levelLabels: Record<string, string> = { B: "Beginner", BB: "Intermediate", A: "Advanced", AA: "Elite" };
const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" });

function formatStartTime(startTime: string) {
  const [hours = "0", minutes = "0"] = startTime.split(":");
  const hour = Number(hours);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes.padStart(2, "0")} ${suffix}`;
}

function formatSessionDate(sessionDate: string, dayOfWeek: number) {
  return sessionDate
    ? dateFormatter.format(new Date(`${sessionDate}T12:00:00`))
    : dayLabels[dayOfWeek];
}

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
    .select("id,title,description,session_date,day_of_week,start_time,end_time,level,capacity")
    .eq("is_active", true)
    .gte("session_date", new Date().toISOString().slice(0, 10))
    .order("session_date", { ascending: true })
    .order("start_time", { ascending: true });

  const { data: roster } = await supabase
    .from("class_registration_roster")
    .select("class_session_id,display_name");

  const { data: ownRegistrations } = user
    ? await supabase
      .from("class_registrations")
      .select("class_session_id")
      .eq("user_id", user.id)
    : { data: [] };

  const attendeesBySession = new Map<string, string[]>();
  for (const registration of roster ?? []) {
    const attendees = attendeesBySession.get(registration.class_session_id) ?? [];
    attendees.push(registration.display_name || "Player");
    attendeesBySession.set(registration.class_session_id, attendees);
  }

  const registeredSessionIds = new Set((ownRegistrations ?? []).map((registration) => registration.class_session_id));

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
          const attendees = attendeesBySession.get(session.id) ?? [];
          const isRegistered = registeredSessionIds.has(session.id);
          const isFull = attendees.length >= session.capacity;
          const matchesFocus = focus ? session.title.toLowerCase().includes(focus) : false;
          const isSelected = selectedSessionId === session.id || (!selectedSessionId && matchesFocus);

          return (
            <article key={session.id} className={`card p-5 ${isSelected ? "ring-2 ring-[var(--sunset)]" : ""}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="m-0 mb-1 text-xl text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">{session.title}</h2>
                  <p className="m-0 text-[color:var(--muted)]">{formatSessionDate(session.session_date, session.day_of_week)} at {formatStartTime(session.start_time)} - {formatStartTime(session.end_time)} · {levelLabels[session.level] || session.level}</p>
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
