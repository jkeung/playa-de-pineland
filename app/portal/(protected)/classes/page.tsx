import { createClient } from "@/lib/supabase/server";
import { createClassSession, deleteClassSession } from "@/app/portal/actions";
import { redirect } from "next/navigation";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function ClassAdminPage() {
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
    .select("id,title,day_of_week,start_time,level,capacity,is_active")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          Manage Calendar Events
        </h1>
        <p className="m-0 text-[color:var(--muted)] text-base">Admins can create or remove class events shown on the public calendar.</p>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="m-0 mb-4">Create Event</h2>
        <form action={createClassSession} className="grid gap-3">
          <input name="title" placeholder="Title (e.g. Group Clinic)" required className="input" />
          <textarea name="description" placeholder="Description" className="input min-h-24" />
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <select name="day_of_week" required className="input">
              {days.map((d, i) => <option key={d} value={i}>{d}</option>)}
            </select>
            <input type="time" name="start_time" required className="input" />
            <select name="level" defaultValue="B" className="input">
              <option value="B">Beginner</option>
              <option value="BB">Intermediate</option>
              <option value="A">Advanced</option>
              <option value="AA">Elite</option>
            </select>
            <input type="number" name="capacity" min={1} defaultValue={16} required className="input" />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked /> Active</label>
          <button type="submit" className="btn btn-primary w-fit">Create Event</button>
        </form>
      </section>

      <section className="card p-5">
        <h2 className="m-0 mb-4">Current Events</h2>
        <div className="flex flex-col gap-3">
          {(sessions ?? []).map((session: any) => (
            <div key={session.id} className="flex items-center justify-between gap-3 p-3 border border-[var(--border)] rounded-lg">
              <div>
                <p className="m-0 font-semibold">{session.title}</p>
                <p className="m-0 text-sm text-[color:var(--muted)]">{days[session.day_of_week]} {session.start_time.slice(0,5)} · {session.level} · cap {session.capacity} · {session.is_active ? "Active" : "Inactive"}</p>
              </div>
              <form action={deleteClassSession.bind(null, session.id)}>
                <button type="submit" className="btn btn-secondary">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
