import { createClient } from "@/lib/supabase/server";

export default async function BookSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, email")
    .eq("id", user!.id)
    .single();

  const name = encodeURIComponent(profile?.display_name || "");
  const email = encodeURIComponent(profile?.email || user!.email || "");
  const calendlyUrl = `https://calendly.com/playa-de-pineland?name=${name}&email=${email}`;

  return (
    <div className="portal-dashboard">
      <section className="portal-welcome">
        <h1>Book a Session</h1>
        <p>Pick a time that works for you — your name and email are pre-filled.</p>
      </section>

      <div className="booking-embed">
        <iframe
          src={calendlyUrl}
          className="booking-iframe"
          title="Book a session"
        />
      </div>
    </div>
  );
}
