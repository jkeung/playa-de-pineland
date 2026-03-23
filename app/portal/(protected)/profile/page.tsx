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
    <div className="portal-profile">
      <h1>Your Profile</h1>
      <p className="portal-subtitle">Manage your player information</p>

      <div className="card portal-profile-card">
        <div className="portal-profile-header">
          <div className={`progression-badge progression-badge--${levelColors[level]}`}>
            {level}
          </div>
          <div>
            <h2>{profile?.display_name || "Player"}</h2>
            <p>{user!.email}</p>
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
