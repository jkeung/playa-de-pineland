import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deleteAnnouncement } from "@/app/portal/actions";

const levelLabels: Record<string, string> = {
  B: "Beginner",
  BB: "Intermediate",
  A: "Advanced",
  AA: "Elite",
};

const levelColors: Record<string, string> = {
  B: "sand",
  BB: "palm",
  A: "ocean",
  AA: "sunset",
};

const categoryLabels: Record<string, string> = {
  general: "General",
  weather: "Weather",
  event: "Event",
  maintenance: "Maintenance",
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function PortalDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5);

  const level = profile?.level || "B";
  const isAdmin = profile?.is_admin || false;

  return (
    <div className="portal-dashboard">
      <section className="mb-8">
        <h1
          className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Welcome back, {profile?.display_name || "Player"}
        </h1>
        <p className="m-0 text-[color:var(--muted)] text-base">Your player portal for Playa de Pineland</p>
      </section>

      {/* Announcements Feed */}
      <section className="mb-7">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3 max-md:flex-col max-md:items-start">
          <h2 className="m-0 text-[1.2rem] text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Announcements</h2>
          {isAdmin && (
            <Link href="/portal/announcements" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "8px 18px" }}>
              New Announcement
            </Link>
          )}
        </div>
        {!announcements?.length ? (
          <p className="text-[color:var(--muted)] text-[0.92rem] m-0 py-[18px]">No announcements yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((a) => (
              <div key={a.id} className={`announcement-item announcement-item--${a.category}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`announcement-badge announcement-badge--${a.category}`}>
                    {categoryLabels[a.category] || a.category}
                  </span>
                  {a.pinned && <span className="announcement-badge announcement-badge--pinned">Pinned</span>}
                  <span className="text-[0.8rem] text-[color:var(--muted)]">{timeAgo(a.created_at)}</span>
                </div>
                <h4 className="m-0 mb-[6px] text-[1.05rem] text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">{a.title}</h4>
                <p className="m-0 text-[color:var(--muted)] text-[0.92rem] leading-[1.7]">{a.body}</p>
                {isAdmin && (
                  <form action={deleteAnnouncement.bind(null, a.id)} style={{ marginTop: "8px" }}>
                    <button type="submit" className="btn btn-secondary !py-[4px] !px-[14px] !text-[0.78rem] !text-[#dc2626] !border-[rgba(220,38,38,0.2)] hover:!bg-[rgba(220,38,38,0.08)] dark:!text-[#f87171] dark:!border-[rgba(248,113,113,0.2)] dark:hover:!bg-[rgba(248,113,113,0.1)]">
                      Delete
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-1">
        <div className="card p-6">
          <div className="mb-[18px]">
            <h3 className="m-0 text-[0.88rem] uppercase tracking-[0.06em] text-[color:var(--muted)] font-bold">Your Level</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className={`progression-badge progression-badge--${levelColors[level]}`}>
              {level}
            </div>
            <span className="text-[1.2rem] font-bold text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">{levelLabels[level]}</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-[18px]">
            <h3 className="m-0 text-[0.88rem] uppercase tracking-[0.06em] text-[color:var(--muted)] font-bold">Quick Links</h3>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Link href="/portal/profile" className="btn btn-secondary text-center no-underline !text-[0.9rem] !py-[10px] !px-[18px]">
              Edit Profile
            </Link>
            <Link href="/portal/book" className="btn btn-primary text-center no-underline !text-[0.9rem] !py-[10px] !px-[18px]">
              Book a Session
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-[18px]">
            <h3 className="m-0 text-[0.88rem] uppercase tracking-[0.06em] text-[color:var(--muted)] font-bold">Account</h3>
          </div>
          <div>
            <p className="m-0 mb-2 text-[0.92rem] text-[color:var(--muted)]"><strong className="text-[color:var(--text)]">Email:</strong> {user!.email}</p>
            <p className="m-0 mb-2 text-[0.92rem] text-[color:var(--muted)]"><strong className="text-[color:var(--text)]">Member since:</strong> {new Date(profile?.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
