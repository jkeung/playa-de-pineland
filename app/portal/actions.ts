"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function loginWithProvider(provider: "google" | "facebook" | "apple") {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/portal/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(data.url);
}

export async function login(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/portal");
}

export async function signup(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const fullName = formData.get("full_name") as string;

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/portal");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function createAnnouncement(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return { error: "Only admins can create announcements" };
  }

  const { error } = await supabase.from("announcements").insert({
    author_id: user.id,
    title: formData.get("title") as string,
    body: formData.get("body") as string,
    category: formData.get("category") as string,
    pinned: formData.get("pinned") === "true",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/portal");
  redirect("/portal/announcements");
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) return;

  await supabase.from("announcements").delete().eq("id", id);

  revalidatePath("/portal");
  revalidatePath("/portal/announcements");
}

export async function updateProfile(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: formData.get("display_name") as string,
      phone: formData.get("phone") as string,
      bio: formData.get("bio") as string,
      level: formData.get("level") as string,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/portal", "layout");
  redirect("/portal");
}
