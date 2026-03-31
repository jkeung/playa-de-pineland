import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/portal/ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const levelColors: Record<string, string> = { B: "sand", BB: "palm", A: "ocean", AA: "sunset" };
  const level = profile?.level || "B";

  return (
    <div className="max-w-[640px]">
      <h1
        className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        Your Profile
      </h1>
      <p className="m-0 mb-7 text-[color:var(--muted)] text-base">Manage your player information</p>

      <div className="card p-8 max-md:p-[22px]">
        <div className="flex items-center gap-[18px] mb-7 pb-6 border-b border-[var(--border)] max-md:flex-col max-md:text-center">
          <div className={`progression-badge progression-badge--${levelColors[level]}`}>
            {level}
          </div>
          <div>
            <h2 className="m-0 mb-[2px] text-[1.2rem] text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">{profile?.display_name || "Player"}</h2>
            <p className="m-0 text-[color:var(--muted)] text-[0.9rem]">{user!.email}</p>
          </div>
        </div>

        <ProfileForm
          profile={{
            display_name: profile?.display_name || "",
            phone: profile?.phone || "",
            bio: profile?.bio || "",
            level: profile?.level || "B",
          }}
        />
      </div>
    </div>
  );
}
