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
      <section className="mb-8">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1
              className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Manage Announcements
            </h1>
            <p className="m-0 text-[color:var(--muted)] text-base">Create and manage announcements for all players.</p>
          </div>
          <Link href="/portal" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-1" style={{ gridTemplateColumns: "1fr" }}>
        <div className="card p-6">
          <div className="mb-[18px]">
            <h3 className="m-0 text-[0.88rem] uppercase tracking-[0.06em] text-[color:var(--muted)] font-bold">New Announcement</h3>
          </div>
          <AnnouncementForm />
        </div>

        <div className="card p-6">
          <div className="mb-[18px]">
            <h3 className="m-0 text-[0.88rem] uppercase tracking-[0.06em] text-[color:var(--muted)] font-bold">All Announcements ({announcements?.length || 0})</h3>
          </div>
          {!announcements?.length ? (
            <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>No announcements yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {announcements.map((a) => (
                <div key={a.id} className={`announcement-item announcement-item--${a.category}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`announcement-badge announcement-badge--${a.category}`}>
                      {categoryLabels[a.category] || a.category}
                    </span>
                    {a.pinned && <span className="announcement-badge announcement-badge--pinned">Pinned</span>}
                    <span className="text-[0.8rem] text-[color:var(--muted)]">
                      {new Date(a.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="m-0 mb-[6px] text-[1.05rem] text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">{a.title}</h4>
                  <p className="m-0 text-[color:var(--muted)] text-[0.92rem] leading-[1.7]">{a.body}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <span className="text-[0.82rem] text-[color:var(--muted)]">
                      By {(a.profiles as { display_name: string })?.display_name || "Admin"}
                    </span>
                    <form action={deleteAnnouncement.bind(null, a.id)}>
                      <button type="submit" className="btn btn-secondary !py-[4px] !px-[14px] !text-[0.78rem] !text-[#dc2626] !border-[rgba(220,38,38,0.2)] hover:!bg-[rgba(220,38,38,0.08)] dark:!text-[#f87171] dark:!border-[rgba(248,113,113,0.2)] dark:hover:!bg-[rgba(248,113,113,0.1)]">
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
