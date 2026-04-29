import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Session = {
  id: string;
  label: string;
  level: string;
  attendees: string[];
} | null;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const times = ["6:00 PM"] as const;

const levelLabels: Record<string, string> = {
  B: "Beginner",
  BB: "Intermediate",
  A: "Advanced",
  AA: "Elite",
};

const levelColors: Record<string, string> = {
  B: "beginner",
  BB: "intermediate",
  A: "advanced",
  AA: "advanced",
};

export default async function Schedule() {
  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("class_sessions")
    .select("id,title,day_of_week,start_time,level,class_registrations(user_id,profiles!class_registrations_user_id_fkey(display_name))")
    .eq("is_active", true);

  const schedule: Record<string, Record<string, Session>> = {};

  for (const day of days) {
    schedule[day] = { "6:00 PM": null };
  }

  for (const session of sessions ?? []) {
    const day = days[session.day_of_week as number];
    if (!day) continue;

    const attendees = ((session.class_registrations as any[]) ?? []).map((r) => r.profiles?.display_name || "Player");

    schedule[day]["6:00 PM"] = {
      id: session.id,
      label: session.title,
      level: levelLabels[session.level] || session.level,
      attendees,
    };
  }

  return (
    <section className="pt-[42px] pb-[22px]" id="schedule">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Weekly Class Schedule</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Members can sign up in the portal. Signed-up players are shown publicly below.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-[var(--radius)] shadow-[var(--shadow)] bg-[var(--card)] border border-[var(--border)] max-md:hidden">
          <table className="w-full min-w-[640px] border-collapse text-[0.92rem]">
            <thead>
              <tr>
                <th className="py-[14px] px-3 font-bold text-[color:var(--ocean-dark)] text-center border-b-2 border-[rgba(8,57,72,0.08)] whitespace-nowrap dark:text-heading-dark">Time</th>
                {days.map((d) => (
                  <th key={d} className="py-[14px] px-3 font-bold text-[color:var(--ocean-dark)] text-center border-b-2 border-[rgba(8,57,72,0.08)] whitespace-nowrap dark:text-heading-dark">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td className="py-[10px] px-[14px] font-semibold text-[color:var(--muted)] whitespace-nowrap text-[0.85rem] text-center">{time}</td>
                  {days.map((day) => {
                    const s = schedule[day]?.[time] ?? null;
                    if (!s) {
                      return <td key={day} className="py-3 px-[10px] text-center border border-[rgba(8,57,72,0.05)] rounded-lg schedule-cell--muted"><strong className="text-[0.75rem]">No class</strong></td>;
                    }

                    const levelClass = levelColors[s.level === "Intermediate" ? "BB" : s.level === "Advanced" ? "A" : s.level === "Elite" ? "AA" : "B"];

                    return (
                      <td key={day} className={`py-3 px-[10px] text-center border border-[rgba(8,57,72,0.05)] rounded-lg schedule-cell--${levelClass}`}>
                        <Link href={`/portal/book?session=${s.id}`} className="block no-underline text-inherit">
                          <strong className="block text-[0.75rem] mb-[2px] whitespace-nowrap">{s.label}</strong>
                          <span className={`text-[0.78rem] opacity-70 schedule-level schedule-level--${levelClass}`}>{s.level}</span>
                          <p className="m-0 mt-2 text-[0.75rem] text-[color:var(--muted)]">{s.attendees.length ? s.attendees.join(", ") : "No signups yet"}</p>
                          <span className="text-[0.72rem] underline">Book this class</span>
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
