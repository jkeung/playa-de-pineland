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
  const calendlyUrl = `https://calendly.com/playadepineland?name=${name}&email=${email}`;

  return (
    <div>
      <section className="mb-8">
        <h1
          className="text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] m-0 mb-[6px]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Book a Session
        </h1>
        <p className="m-0 text-[color:var(--muted)] text-base">Pick a time that works for you — your name and email are pre-filled.</p>
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
