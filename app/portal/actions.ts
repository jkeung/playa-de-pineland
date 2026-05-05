"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const CLASS_SESSION_TITLE_MAX_LENGTH = 40;

function getDayOfWeek(date: string) {
  return new Date(`${date}T12:00:00`).getDay();
}

function getClassSessionPayload(formData: FormData) {
  const sessionDate = formData.get("session_date") as string;

  return {
    title: String(formData.get("title") ?? "").trim().slice(0, CLASS_SESSION_TITLE_MAX_LENGTH),
    description: (formData.get("description") as string) || "",
    session_date: sessionDate,
    day_of_week: getDayOfWeek(sessionDate),
    start_time: formData.get("start_time") as string,
    end_time: formData.get("end_time") as string,
    level: formData.get("level") as string,
    capacity: Number(formData.get("capacity")),
    is_active: formData.get("is_active") === "on",
  };
}

function parseTags(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .filter((tag, index, tags) => tags.indexOf(tag) === index);
}

async function hasClassSessionConflict(
  supabase: Awaited<ReturnType<typeof createClient>>,
  sessionDates: string[],
  startTime: string,
  endTime: string,
  excludeSessionId?: string,
) {
  let query = supabase
    .from("class_sessions")
    .select("id, session_date")
    .in("session_date", sessionDates)
    .lt("start_time", endTime)
    .gt("end_time", startTime);

  if (excludeSessionId) {
    query = query.neq("id", excludeSessionId);
  }

  const { data, error } = await query.limit(1);

  if (error) {
    return { error };
  }

  return {
    conflictDate: data?.[0]?.session_date as string | undefined,
  };
}

function isInvalidTimeRange(startTime: string, endTime: string) {
  return endTime <= startTime;
}

async function ensureAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/portal");
  }

  return supabase;
}

export async function loginWithProvider(provider: "google" | "facebook" | "apple") {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || (await headers()).get("origin");

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

export async function createJournalEntry(prevState: { error?: string } | null, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    return { error: "Journal entry cannot be empty" };
  }

  const { error } = await supabase.from("journal_entries").insert({
    user_id: user.id,
    entry_date: formData.get("entry_date") as string,
    title: (formData.get("title") as string) || "",
    body,
    tags: parseTags(formData.get("tags")),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/portal");
  redirect("/portal");
}

export async function updateJournalEntry(entryId: string, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/portal/login");
  }

  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    redirect("/portal?journal_error=Journal%20entry%20cannot%20be%20empty");
  }

  const { error } = await supabase
    .from("journal_entries")
    .update({
      entry_date: formData.get("entry_date") as string,
      title: (formData.get("title") as string) || "",
      body,
      tags: parseTags(formData.get("tags")),
    })
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/portal?journal_error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/portal");
  redirect("/portal");
}

export async function deleteJournalEntry(entryId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/portal/login");
  }

  await supabase
    .from("journal_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", user.id);

  revalidatePath("/portal");
}


export async function registerForClass(classSessionId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/portal/login');
  }

  const { data: session } = await supabase
    .from('class_sessions')
    .select('id, capacity, class_registrations!left(id)')
    .eq('id', classSessionId)
    .eq('is_active', true)
    .single();

  if (!session) {
    redirect('/portal/book?error=Class%20not%20found');
  }

  const currentCount = (session.class_registrations ?? []).length;
  if (currentCount >= session.capacity) {
    redirect('/portal/book?error=Class%20is%20full');
  }

  const { error } = await supabase.from('class_registrations').insert({
    class_session_id: classSessionId,
    user_id: user.id,
  });

  if (error && !error.message.toLowerCase().includes('duplicate')) {
    redirect(`/portal/book?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/');
  revalidatePath('/portal/book');
  redirect('/portal/book');
}

export async function cancelClassRegistration(classSessionId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/portal/login');
  }

  await supabase
    .from('class_registrations')
    .delete()
    .eq('class_session_id', classSessionId)
    .eq('user_id', user.id);

  revalidatePath('/');
  revalidatePath('/portal/book');
  redirect('/portal/book');
}


export async function createClassSession(formData: FormData) {
  const supabase = await ensureAdmin();
  const dates = formData
    .getAll("session_dates")
    .map((date) => String(date))
    .filter(Boolean);
  const sessionDates = dates.length ? dates : [String(formData.get("session_date") ?? "")].filter(Boolean);

  if (!sessionDates.length) {
    redirect("/portal/classes?error=Choose%20at%20least%20one%20date");
  }

  const payload = getClassSessionPayload(formData);
  if (isInvalidTimeRange(payload.start_time, payload.end_time)) {
    redirect("/portal/classes?error=End%20time%20must%20be%20after%20start%20time");
  }

  const conflict = await hasClassSessionConflict(supabase, sessionDates, payload.start_time, payload.end_time);
  if ("error" in conflict && conflict.error) {
    redirect(`/portal/classes?error=${encodeURIComponent(conflict.error.message)}`);
  }

  if (conflict.conflictDate) {
    redirect(`/portal/classes?error=${encodeURIComponent("That time slot is already booked on one of the selected dates")}`);
  }

  const sessions = sessionDates.map((sessionDate) => ({
    ...payload,
    session_date: sessionDate,
    day_of_week: getDayOfWeek(sessionDate),
  }));

  const { error } = await supabase.from("class_sessions").insert(sessions);

  if (error) {
    redirect(`/portal/classes?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portal/book");
  revalidatePath("/portal/classes");
  redirect("/portal/classes");
}

export async function updateClassSession(classSessionId: string, formData: FormData) {
  const supabase = await ensureAdmin();
  const capacity = Number(formData.get("capacity"));
  const payload = getClassSessionPayload(formData);

  if (isInvalidTimeRange(payload.start_time, payload.end_time)) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent("End time must be after start time")}`);
  }

  const conflict = await hasClassSessionConflict(
    supabase,
    [payload.session_date],
    payload.start_time,
    payload.end_time,
    classSessionId,
  );
  if ("error" in conflict && conflict.error) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent(conflict.error.message)}`);
  }

  if (conflict.conflictDate) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent("That time slot is already booked on this date")}`);
  }

  const { count } = await supabase
    .from("class_registrations")
    .select("id", { count: "exact", head: true })
    .eq("class_session_id", classSessionId);

  if ((count ?? 0) > capacity) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent("Capacity cannot be below current registrations")}`);
  }

  const { error } = await supabase
    .from("class_sessions")
    .update(payload)
    .eq("id", classSessionId);

  if (error) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portal/book");
  revalidatePath("/portal/classes");
  redirect(`/portal/classes?selected=${classSessionId}`);
}

export async function deleteClassSession(classSessionId: string) {
  const supabase = await ensureAdmin();

  await supabase.from("class_sessions").delete().eq("id", classSessionId);

  revalidatePath("/");
  revalidatePath("/portal/book");
  revalidatePath("/portal/classes");
  redirect("/portal/classes");
}

export async function deleteClassRegistration(registrationId: string, classSessionId: string) {
  const supabase = await ensureAdmin();

  const { error } = await supabase
    .from("class_registrations")
    .delete()
    .eq("id", registrationId);

  if (error) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portal/book");
  revalidatePath("/portal/classes");
  redirect(`/portal/classes?selected=${classSessionId}`);
}

export async function addExistingClassRegistration(classSessionId: string, formData: FormData) {
  const supabase = await ensureAdmin();
  const userId = String(formData.get("user_id") ?? "");

  if (!userId) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent("Choose a player to add")}`);
  }

  const { error } = await supabase
    .from("class_registrations")
    .insert({
      class_session_id: classSessionId,
      user_id: userId,
    });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portal/book");
  revalidatePath("/portal/classes");
  redirect(`/portal/classes?selected=${classSessionId}`);
}

export async function addGuestClassRegistration(classSessionId: string, formData: FormData) {
  const supabase = await ensureAdmin();
  const guestName = String(formData.get("guest_name") ?? "").trim();

  if (!guestName) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent("Enter a guest name")}`);
  }

  const { error } = await supabase
    .from("class_registrations")
    .insert({
      class_session_id: classSessionId,
      guest_name: guestName,
    });

  if (error) {
    redirect(`/portal/classes?selected=${classSessionId}&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portal/book");
  revalidatePath("/portal/classes");
  redirect(`/portal/classes?selected=${classSessionId}`);
}
