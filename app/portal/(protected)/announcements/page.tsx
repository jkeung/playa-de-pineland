import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnnouncementForm from "@/components/portal/AnnouncementForm";
import { deleteAnnouncement } from "@/app/portal/actions";

const categoryLabels: Record<string, string> = {
  general: "General",
  weather: "Weather",
  event: "Event",
  maintenance: "Maintenance",
};

export default async function AnnouncementsPage() {
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

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*, profiles(display_name)")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="portal-dashboard">
      <section className="portal-welcome">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1>Manage Announcements</h1>
            <p>Create and manage announcements for all players.</p>
          </div>
          <Link href="/portal" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </section>

      <div className="portal-cards" style={{ gridTemplateColumns: "1fr" }}>
        <div className="card portal-card">
          <div className="portal-card-header">
            <h3>New Announcement</h3>
          </div>
          <AnnouncementForm />
        </div>

        <div className="card portal-card">
          <div className="portal-card-header">
            <h3>All Announcements ({announcements?.length || 0})</h3>
          </div>
          {!announcements?.length ? (
            <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>No announcements yet.</p>
          ) : (
            <div className="announcement-feed">
              {announcements.map((a) => (
                <div key={a.id} className={`announcement-item announcement-item--${a.category}`}>
                  <div className="announcement-meta">
                    <span className={`announcement-badge announcement-badge--${a.category}`}>
                      {categoryLabels[a.category] || a.category}
                    </span>
                    {a.pinned && <span className="announcement-badge announcement-badge--pinned">Pinned</span>}
                    <span className="announcement-time">
                      {new Date(a.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="announcement-title">{a.title}</h4>
                  <p className="announcement-body">{a.body}</p>
                  <div className="announcement-actions">
                    <span className="announcement-author">
                      By {(a.profiles as { display_name: string })?.display_name || "Admin"}
                    </span>
                    <form action={deleteAnnouncement.bind(null, a.id)}>
                      <button type="submit" className="btn btn-secondary announcement-delete-btn">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
