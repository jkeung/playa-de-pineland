type Session = {
  label: string;
  color: string;
  level?: string;
  levelColor?: string;
} | null;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const times = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"] as const;

const weekendCell: Session = {
  label: "Open Play",
  color: "ocean",
};

const openSlot: Session = {
  label: "Open Slot",
  color: "muted",
};

const schedule: Record<string, Record<string, Session>> = {
  Mon: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": { label: "Open Play", color: "beginner", level: "Beginner", levelColor: "beginner" },
  },
  Tue: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": { label: "Open Play", color: "intermediate", level: "Intermediate", levelColor: "intermediate" },
  },
  Wed: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": { label: "Group Clinic", color: "beginner", level: "Beginner", levelColor: "beginner" },
  },
  Thu: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": { label: "Open Play", color: "advanced", level: "Advanced", levelColor: "advanced" },
  },
  Fri: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": { label: "Group Clinic", color: "intermediate", level: "Intermediate", levelColor: "intermediate" },
  },
  Sat: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": openSlot,
  },
  Sun: {
    "9:00 AM": openSlot,
    "12:00 PM": openSlot,
    "3:00 PM": openSlot,
    "6:00 PM": openSlot,
  },
};

export default function Schedule() {
  return (
    <section className="pt-[42px] pb-[22px]" id="schedule">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Weekly Schedule</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Beach Doubles — Weekday evenings at 6 PM and open slots all day on weekends.
            </p>
          </div>
        </div>

        {/* Desktop table */}
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-[var(--radius)] shadow-[var(--shadow)] bg-[var(--card)] border border-[var(--border)] schedule-desktop">
          <table className="w-full min-w-[640px] border-collapse text-[0.92rem]">
            <thead>
              <tr>
                <th className="py-[14px] px-3 font-bold text-[color:var(--ocean-dark)] text-center border-b-2 border-[rgba(8,57,72,0.08)] whitespace-nowrap dark:text-heading-dark">Time</th>
                {days.map((d) => (
                  <th key={d} className="py-[14px] px-3 font-bold text-[color:var(--ocean-dark)] text-center border-b-2 border-[rgba(8,57,72,0.08)] whitespace-nowrap dark:text-heading-dark">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td className="py-[10px] px-[14px] font-semibold text-[color:var(--muted)] whitespace-nowrap text-[0.85rem] text-center">{time}</td>
                  {days.map((day) => {
                    const s = schedule[day]?.[time] ?? null;
                    return s ? (
                      <td
                        key={day}
                        className={`py-3 px-[10px] text-center border border-[rgba(8,57,72,0.05)] rounded-lg schedule-cell--${s.color}`}
                      >
                        <strong className="block text-[0.75rem] mb-[2px] whitespace-nowrap">{s.label}</strong>
                        {s.level && (
                          <span className={`text-[0.78rem] opacity-70 schedule-level schedule-level--${s.levelColor}`}>
                            {s.level}
                          </span>
                        )}
                      </td>
                    ) : (
                      <td key={day} className={`py-3 px-[10px] text-center border border-[rgba(8,57,72,0.05)] rounded-lg schedule-cell--empty`} />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="hidden max-md:flex max-md:flex-col max-md:gap-3">
          {days.map((day) => (
            <div key={day} className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-4 shadow-[var(--shadow)]">
              <h3 className="text-base font-bold text-[color:var(--ocean-dark)] mb-[10px] pb-2 border-b-2 border-[rgba(8,57,72,0.08)] dark:text-heading-dark">{day}</h3>
              <div className="flex flex-col gap-2">
                {times.map((time) => {
                  const s = schedule[day]?.[time] ?? null;
                  return s ? (
                    <div
                      key={time}
                      className={`flex items-center gap-[10px] py-[10px] px-3 rounded-lg schedule-cell--${s.color}`}
                    >
                      <span className="text-[0.78rem] font-semibold text-[color:var(--muted)] min-w-[70px] shrink-0">{time}</span>
                      <strong className="text-[0.85rem] flex-1">{s.label}</strong>
                      {s.level && (
                        <span className={`schedule-level schedule-level--${s.levelColor}`}>
                          {s.level}
                        </span>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
