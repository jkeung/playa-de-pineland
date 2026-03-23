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
      <section className="portal-welcome">
        <h1>Welcome back, {profile?.display_name || "Player"}</h1>
        <p>Your player portal for Playa de Pineland</p>
      </section>

      {/* Announcements Feed */}
      <section className="announcement-section">
        <div className="announcement-section-header">
          <h2>Announcements</h2>
          {isAdmin && (
            <Link href="/portal/announcements" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "8px 18px" }}>
              New Announcement
            </Link>
          )}
        </div>
        {!announcements?.length ? (
          <p className="announcement-empty">No announcements yet.</p>
        ) : (
          <div className="announcement-feed">
            {announcements.map((a) => (
              <div key={a.id} className={`announcement-item announcement-item--${a.category}`}>
                <div className="announcement-meta">
                  <span className={`announcement-badge announcement-badge--${a.category}`}>
                    {categoryLabels[a.category] || a.category}
                  </span>
                  {a.pinned && <span className="announcement-badge announcement-badge--pinned">Pinned</span>}
                  <span className="announcement-time">{timeAgo(a.created_at)}</span>
                </div>
                <h4 className="announcement-title">{a.title}</h4>
                <p className="announcement-body">{a.body}</p>
                {isAdmin && (
                  <form action={deleteAnnouncement.bind(null, a.id)} style={{ marginTop: "8px" }}>
                    <button type="submit" className="btn btn-secondary announcement-delete-btn">
                      Delete
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="portal-cards">
        <div className="card portal-card">
          <div className="portal-card-header">
            <h3>Your Level</h3>
          </div>
          <div className="portal-level-display">
            <div className={`progression-badge progression-badge--${levelColors[level]}`}>
              {level}
            </div>
            <span className="portal-level-label">{levelLabels[level]}</span>
          </div>
        </div>

        <div className="card portal-card">
          <div className="portal-card-header">
            <h3>Quick Links</h3>
          </div>
          <div className="portal-quick-links">
            <Link href="/portal/profile" className="btn btn-secondary portal-link-btn">
              Edit Profile
            </Link>
            <Link href="/portal/book" className="btn btn-primary portal-link-btn">
              Book a Session
            </Link>
          </div>
        </div>

        <div className="card portal-card">
          <div className="portal-card-header">
            <h3>Account</h3>
          </div>
          <div className="portal-account-info">
            <p><strong>Email:</strong> {user!.email}</p>
            <p><strong>Member since:</strong> {new Date(profile?.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
