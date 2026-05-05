"use client";

import { useMemo, useState } from "react";
import {
  addExistingClassRegistration,
  addGuestClassRegistration,
  createClassSession,
  deleteClassRegistration,
  deleteClassSession,
  updateClassSession,
} from "@/app/portal/actions";

type ClassSession = {
  id: string;
  title: string;
  description: string;
  session_date: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  level: string;
  capacity: number;
  is_active: boolean;
};

type ClassRegistration = {
  id: string;
  user_id: string | null;
  display_name: string;
};

type PlayerProfile = {
  id: string;
  display_name: string;
  full_name: string;
};

const levelLabels: Record<string, string> = {
  B: "Beginner",
  BB: "Intermediate",
  A: "Advanced",
  AA: "Elite",
};

const capacityOptions = Array.from({ length: 32 }, (_, index) => index + 1);
const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(date: string) {
  return new Date(`${date}T12:00:00`);
}

function formatTime(startTime: string) {
  const [hours = "0", minutes = "0"] = startTime.split(":");
  const hour = Number(hours);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes.padStart(2, "0")} ${suffix}`;
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function buildMonthDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

function EventFields({ session }: { session?: ClassSession }) {
  return (
    <>
      <label className="grid gap-2 text-sm font-semibold">
        Title
        <input name="title" defaultValue={session?.title ?? ""} placeholder="Group Clinic" required className="portal-form-input" />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Description
        <textarea name="description" defaultValue={session?.description ?? ""} placeholder="Coached drills, open play, or private lesson details" className="portal-form-input portal-form-textarea" />
      </label>

      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <label className="grid gap-2 text-sm font-semibold">
          Time
          <input type="time" name="start_time" defaultValue={session?.start_time?.slice(0, 5) ?? "18:00"} required className="portal-form-input" />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          End time
          <input type="time" name="end_time" defaultValue={session?.end_time?.slice(0, 5) ?? "19:00"} required className="portal-form-input" />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Capacity
          <select name="capacity" defaultValue={session?.capacity ?? 16} className="portal-form-input">
            {capacityOptions.map((capacity) => (
              <option key={capacity} value={capacity}>{capacity}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Level
          <select name="level" defaultValue={session?.level ?? "B"} className="portal-form-input">
            {Object.entries(levelLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 self-end text-sm font-semibold min-h-[46px] md:col-span-2">
          <input type="checkbox" name="is_active" defaultChecked={session?.is_active ?? true} />
          Active
        </label>
      </div>
    </>
  );
}

export default function ClassCalendarManager({
  sessions,
  registrationsBySession,
  playerProfiles,
  selectedSessionId,
  error,
}: {
  sessions: ClassSession[];
  registrationsBySession: Record<string, ClassRegistration[]>;
  playerProfiles: PlayerProfile[];
  selectedSessionId?: string;
  error?: string;
}) {
  const today = useMemo(() => new Date(), []);
  const initialSession = sessions.find((session) => session.id === selectedSessionId) ?? sessions[0];
  const [visibleMonth, setVisibleMonth] = useState(() => parseDate(initialSession?.session_date ?? toDateInputValue(today)));
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [datePickerValue, setDatePickerValue] = useState(toDateInputValue(today));
  const [activeSessionId, setActiveSessionId] = useState(selectedSessionId ?? "");
  const [creationNotice, setCreationNotice] = useState<string | null>(null);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId),
    [sessions, activeSessionId],
  );
  const activeRegistrations = useMemo(
    () => activeSession ? registrationsBySession[activeSession.id] ?? [] : [],
    [activeSession, registrationsBySession],
  );
  const registeredUserIds = useMemo(
    () => new Set(activeRegistrations.map((registration) => registration.user_id).filter(Boolean)),
    [activeRegistrations],
  );
  const availableProfiles = useMemo(
    () => playerProfiles.filter((profile) => !registeredUserIds.has(profile.id)),
    [playerProfiles, registeredUserIds],
  );
  const eventsByDate = useMemo(() => {
    const map = new Map<string, ClassSession[]>();
    for (const session of sessions) {
      const dayEvents = map.get(session.session_date) ?? [];
      dayEvents.push(session);
      map.set(session.session_date, dayEvents);
    }
    return map;
  }, [sessions]);
  const occupiedDates = useMemo(() => new Set(sessions.map((session) => session.session_date)), [sessions]);
  const monthDays = useMemo(() => buildMonthDays(visibleMonth), [visibleMonth]);

  function moveMonth(direction: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  function toggleDate(date: string) {
    if (occupiedDates.has(date) && !selectedDates.includes(date)) {
      setCreationNotice("That date already has an event.");
      return;
    }

    setCreationNotice(null);
    setSelectedDates((current) => (
      current.includes(date)
        ? current.filter((selectedDate) => selectedDate !== date)
        : [...current, date].sort()
    ));
  }

  function addDateFromPicker() {
    if (!datePickerValue) return;

    if (occupiedDates.has(datePickerValue)) {
      setCreationNotice("That date already has an event.");
      return;
    }

    setCreationNotice(null);
    setSelectedDates((current) => (
      current.includes(datePickerValue)
        ? current
        : [...current, datePickerValue].sort()
    ));
    setVisibleMonth(parseDate(datePickerValue));
  }

  return (
    <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] gap-5 max-lg:grid-cols-1">
      <section className="card p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div>
            <h2 className="m-0 text-xl text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Create Dates</h2>
            <p className="m-0 mt-1 text-sm text-[color:var(--muted)]">Use the calendar to pick dates for a new event. Click event chips separately to edit them.</p>
          </div>
          <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
            <button type="button" className="btn btn-secondary !py-2 !px-4" onClick={() => moveMonth(-1)} aria-label="Previous month">‹</button>
            <strong className="min-w-[160px] text-center max-sm:min-w-0">{monthFormatter.format(visibleMonth)}</strong>
            <button type="button" className="btn btn-secondary !py-2 !px-4" onClick={() => moveMonth(1)} aria-label="Next month">›</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted)] mb-2 max-sm:hidden">
          {weekdayLabels.map((day) => <span key={day}>{day}</span>)}
        </div>

        <div className="grid grid-cols-7 gap-2 max-sm:grid-cols-1">
          {monthDays.map((day) => {
            const date = toDateInputValue(day);
            const dayEvents = eventsByDate.get(date) ?? [];
            const isCurrentMonth = monthKey(day) === monthKey(visibleMonth);
            const isSelected = selectedDates.includes(date);

            return (
              <div
                key={date}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => toggleDate(date)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleDate(date);
                  }
                }}
                className={`min-h-[104px] rounded-lg border p-2 text-left transition focus:outline-none focus:ring-2 focus:ring-[var(--sunset)] max-sm:min-h-0 max-sm:p-3 ${occupiedDates.has(date) && !isSelected ? "cursor-not-allowed bg-white/35 border-[rgba(8,57,72,0.08)] opacity-70" : "cursor-pointer"} ${isCurrentMonth ? "bg-white/60 border-[rgba(8,57,72,0.1)]" : "bg-white/20 border-transparent opacity-50 max-sm:hidden"} ${isSelected ? "ring-2 ring-[var(--sunset)]" : ""}`}
              >
                <span className="block w-full text-left text-sm font-bold">
                  <span className="hidden max-sm:inline">{dateFormatter.format(day)}</span>
                  <span className="max-sm:hidden">{day.getDate()}</span>
                </span>
                <span className="mt-2 grid gap-1">
                  {dayEvents.slice(0, 3).map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveSessionId(session.id);
                        setVisibleMonth(parseDate(session.session_date));
                      }}
                      className={`rounded-md px-2 py-1 text-left text-[0.72rem] font-semibold text-white ${session.is_active ? "bg-[var(--ocean)]" : "bg-[var(--muted)]"}`}
                    >
                      {formatTime(session.start_time)} - {formatTime(session.end_time)} {session.title}
                    </button>
                  ))}
                  {dayEvents.length > 3 && <span className="text-[0.72rem] text-[color:var(--muted)]">+{dayEvents.length - 3} more</span>}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-5">
        <section className="card p-5">
          <h2 className="m-0 mb-4 text-xl text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Create Event</h2>
          {error && <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</p>}
          {creationNotice && <p className="mb-4 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-200">{creationNotice}</p>}
          <form action={createClassSession} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold">Dates</label>
              <div className="flex gap-2">
                <input type="date" value={datePickerValue} onChange={(event) => setDatePickerValue(event.target.value)} className="portal-form-input flex-1" />
                <button type="button" className="btn btn-secondary !py-2 !px-4" onClick={addDateFromPicker}>Add</button>
              </div>
              {!selectedDates.length && <p className="m-0 text-sm text-[color:var(--muted)]">No dates selected yet.</p>}
              <div className="flex flex-wrap gap-2">
                {selectedDates.map((date) => (
                  <span key={date} className="inline-flex items-center gap-2 rounded-full bg-[rgba(30,107,72,0.12)] px-3 py-1 text-sm font-semibold">
                    {dateFormatter.format(parseDate(date))}
                    <button type="button" onClick={() => toggleDate(date)} aria-label={`Remove ${date}`} className="font-bold">×</button>
                    <input type="hidden" name="session_dates" value={date} />
                  </span>
                ))}
              </div>
            </div>

            <EventFields />

            <button type="submit" className="btn btn-primary w-fit">Create {selectedDates.length > 1 ? `${selectedDates.length} Events` : "Event"}</button>
          </form>
        </section>

        <section className="card p-5">
          <h2 className="m-0 mb-4 text-xl text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Edit Event</h2>
          {activeSession ? (
            <div className="grid gap-5" key={activeSession.id}>
              <form action={updateClassSession.bind(null, activeSession.id)} className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold">
                  Date
                  <input type="date" name="session_date" defaultValue={activeSession.session_date} required className="portal-form-input" />
                </label>
                <EventFields session={activeSession} />
                <div className="flex gap-2 flex-wrap">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button formAction={deleteClassSession.bind(null, activeSession.id)} className="btn btn-secondary" type="submit">Delete Event</button>
                </div>
              </form>

              <div className="rounded-lg border border-[var(--border)] p-4 bg-[rgba(255,255,255,0.22)] dark:bg-[rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <h3 className="m-0 text-base text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Attendees</h3>
                  <span className="text-sm text-[color:var(--muted)]">
                    {activeRegistrations.length}/{activeSession.capacity} registered
                  </span>
                </div>

                {activeRegistrations.length ? (
                  <div className="grid gap-2">
                    {activeRegistrations.map((registration) => (
                      <div key={registration.id} className="flex items-center justify-between gap-3 rounded-md border border-[var(--border)] px-3 py-2">
                        <span className="text-sm font-medium text-[color:var(--text)]">{registration.display_name}</span>
                        <form action={deleteClassRegistration.bind(null, registration.id, activeSession.id)}>
                          <button type="submit" className="btn btn-secondary !py-1 !px-3 !text-[0.78rem]">Remove</button>
                        </form>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="m-0 text-sm text-[color:var(--muted)]">No attendees yet.</p>
                )}

                <div className="mt-5 grid gap-4 border-t border-[var(--border)] pt-4">
                  <form action={addExistingClassRegistration.bind(null, activeSession.id)} className="grid gap-2">
                    <label className="text-sm font-semibold" htmlFor="admin-add-player">
                      Add existing player
                    </label>
                    <div className="flex gap-2 max-sm:flex-col">
                      <select
                        id="admin-add-player"
                        name="user_id"
                        className="portal-form-input flex-1"
                        defaultValue=""
                        disabled={!availableProfiles.length}
                        required
                      >
                        <option value="" disabled>
                          {availableProfiles.length ? "Choose a player" : "All players are already registered"}
                        </option>
                        {availableProfiles.map((profile) => (
                          <option key={profile.id} value={profile.id}>
                            {profile.display_name || profile.full_name || "Player"}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className="btn btn-secondary !py-2 !px-4" disabled={!availableProfiles.length}>
                        Add
                      </button>
                    </div>
                  </form>

                  <form action={addGuestClassRegistration.bind(null, activeSession.id)} className="grid gap-2">
                    <label className="text-sm font-semibold" htmlFor="admin-add-guest">
                      Add guest
                    </label>
                    <div className="flex gap-2 max-sm:flex-col">
                      <input
                        id="admin-add-guest"
                        name="guest_name"
                        className="portal-form-input flex-1"
                        placeholder="Guest name"
                        required
                      />
                      <button type="submit" className="btn btn-secondary !py-2 !px-4">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <p className="m-0 text-sm text-[color:var(--muted)]">Select an event chip from the calendar to edit it.</p>
          )}
        </section>
      </div>
    </div>
  );
}
