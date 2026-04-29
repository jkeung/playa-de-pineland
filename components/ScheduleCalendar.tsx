"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ScheduleSession = {
  id: string;
  label: string;
  description: string;
  date: string;
  startTime: string;
  level: string;
  capacity: number;
  attendees: string[];
};

const levelColors: Record<string, string> = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Elite: "advanced",
};

const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const monthDayFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const rangeFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(date: string) {
  return new Date(`${date}T12:00:00`);
}

function getStartOfWeek(date: Date) {
  const start = new Date(date);
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());

  return start;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);

  return next;
}

function formatStartTime(startTime: string) {
  const [hours = "0", minutes = "0"] = startTime.split(":");
  const hour = Number(hours);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes.padStart(2, "0")} ${suffix}`;
}

export default function ScheduleCalendar({
  sessions,
  canShowDetails,
}: {
  sessions: ScheduleSession[];
  canShowDetails: boolean;
}) {
  const [page, setPage] = useState(0);
  const today = useMemo(() => new Date(), []);
  const baseWeekStart = useMemo(() => getStartOfWeek(today), [today]);
  const visibleStart = useMemo(() => addDays(baseWeekStart, page * 28), [baseWeekStart, page]);
  const visibleEnd = useMemo(() => addDays(visibleStart, 27), [visibleStart]);

  const sessionsByDate = useMemo(() => {
    const map = new Map<string, ScheduleSession[]>();
    for (const session of sessions) {
      const daySessions = map.get(session.date) ?? [];
      daySessions.push(session);
      map.set(session.date, daySessions);
    }

    for (const daySessions of map.values()) {
      daySessions.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }

    return map;
  }, [sessions]);

  const weeks = useMemo(() => (
    Array.from({ length: 4 }, (_, weekIndex) => (
      Array.from({ length: 7 }, (_, dayIndex) => addDays(visibleStart, weekIndex * 7 + dayIndex))
    ))
  ), [visibleStart]);

  return (
    <div className="schedule-calendar rounded-[var(--radius)] shadow-[var(--shadow)] bg-[var(--card)] border border-[var(--border)] overflow-hidden">
      <div className="schedule-calendar-header flex items-center justify-between gap-3 flex-wrap px-4 py-3 border-b border-[var(--border)]">
        <div>
          <p className="m-0 text-sm font-bold text-[color:var(--ocean-dark)] dark:text-heading-dark">
            {rangeFormatter.format(visibleStart)} - {rangeFormatter.format(visibleEnd)}
          </p>
          <p className="m-0 text-xs text-[color:var(--muted)]">Showing 4 weeks</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-secondary !py-2 !px-4"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
            aria-label="Previous 4 weeks"
          >
            ‹
          </button>
          <button
            type="button"
            className="btn btn-secondary !py-2 !px-4"
            onClick={() => setPage((current) => current + 1)}
            aria-label="Next 4 weeks"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid gap-3 p-3">
        {weeks.map((week, weekIndex) => (
          <div key={toDateInputValue(week[0])} className="grid grid-cols-7 gap-2 max-lg:grid-cols-1">
            {week.map((day) => {
              const date = toDateInputValue(day);
              const daySessions = sessionsByDate.get(date) ?? [];
              const isToday = date === toDateInputValue(today);

              return (
                <div key={date} className={`schedule-calendar-day min-h-[132px] rounded-lg border p-3 ${isToday ? "schedule-calendar-day--today" : ""}`}>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <strong className="text-sm text-[color:var(--ocean-dark)] dark:text-heading-dark">{weekdayFormatter.format(day)}</strong>
                    <span className="text-xs text-[color:var(--muted)]">{monthDayFormatter.format(day)}</span>
                  </div>

                  {daySessions.length ? (
                    <div className="grid gap-2">
                      {daySessions.map((session) => {
                        const levelClass = levelColors[session.level] ?? "beginner";

                        return (
                          <Link
                            key={session.id}
                            href={`/portal/book?session=${session.id}`}
                            className={`schedule-event-card block no-underline text-inherit rounded-lg py-2 px-2 schedule-cell--${levelClass}`}
                          >
                            <span className="block text-[0.72rem] font-bold">{formatStartTime(session.startTime)}</span>
                            <strong className="block text-[0.78rem]">{session.label}</strong>
                            <span className={`text-[0.72rem] opacity-75 schedule-level schedule-level--${levelClass}`}>{session.level}</span>
                            <p className="m-0 mt-1 text-[0.7rem] text-[color:var(--muted)]">
                              {session.attendees.length ? session.attendees.join(", ") : "No signups yet"}
                            </p>
                            {canShowDetails && (
                              <span className="schedule-event-detail" aria-hidden="true">
                                {session.description && <span className="block mb-2">{session.description}</span>}
                                <span className="block font-bold">{session.attendees.length}/{session.capacity} attending</span>
                                <span className="block mt-1">
                                  {session.attendees.length ? session.attendees.join(", ") : "No attendees yet"}
                                </span>
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="m-0 mt-5 text-center text-xs text-[color:var(--muted)]">No events</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
