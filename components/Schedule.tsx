import { createClient } from "@/lib/supabase/server";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import Weather from "@/components/Weather";

const levelLabels: Record<string, string> = {
  B: "Beginner",
  BB: "Intermediate",
  A: "Advanced",
  AA: "Elite",
};

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);

  return next;
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default async function Schedule() {
  const supabase = await createClient();
  const today = new Date();
  const startDate = toDateInputValue(today);
  const endDate = toDateInputValue(addDays(today, 180));

  const { data: sessions } = await supabase
    .from("class_sessions")
    .select("id,title,description,session_date,start_time,end_time,level,capacity")
    .eq("is_active", true)
    .gte("session_date", startDate)
    .lte("session_date", endDate)
    .order("session_date", { ascending: true })
    .order("start_time", { ascending: true });

  const { data: roster } = await supabase
    .from("class_registration_roster")
    .select("class_session_id,display_name");
  const { data: { user } } = await supabase.auth.getUser();

  const attendeesBySession = new Map<string, string[]>();
  for (const registration of roster ?? []) {
    const attendees = attendeesBySession.get(registration.class_session_id) ?? [];
    attendees.push(registration.display_name || "Player");
    attendeesBySession.set(registration.class_session_id, attendees);
  }

  const scheduleSessions = (sessions ?? []).map((session) => ({
    id: session.id,
    label: session.title,
    description: session.description,
    date: session.session_date,
    startTime: session.start_time,
    endTime: session.end_time,
    level: levelLabels[session.level] || session.level,
    capacity: session.capacity,
    attendees: attendeesBySession.get(session.id) ?? [],
  }));

  return (
    <section className="pt-[42px] pb-[22px]" id="schedule">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Class Calendar</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Members can sign up in the portal. Use the arrows to browse future weeks.
            </p>
            <p className="m-0 mt-2 text-[0.95rem] font-semibold text-[color:var(--ocean-dark)] dark:text-heading-dark">
              First class: $20 · Standard class: $30
            </p>
          </div>
          <Weather />
        </div>

        <ScheduleCalendar sessions={scheduleSessions} canShowDetails={Boolean(user)} />
      </div>
    </section>
  );
}
