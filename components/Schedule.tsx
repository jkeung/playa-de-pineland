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
    <section className="section" id="schedule">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Weekly Schedule</h2>
            <p>
              Beach Doubles — Weekday evenings at 6 PM and open slots all day on weekends.
            </p>
          </div>
        </div>

        {/* Desktop table */}
        <div className="schedule-scroll schedule-desktop">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="schedule-label">Time</th>
                {days.map((d) => (
                  <th key={d} className="schedule-label">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td className="schedule-time">{time}</td>
                  {days.map((day) => {
                    const s = schedule[day]?.[time] ?? null;
                    return s ? (
                      <td
                        key={day}
                        className={`schedule-cell schedule-cell--${s.color}`}
                      >
                        <strong>{s.label}</strong>
                        {s.level && (
                          <span className={`schedule-level schedule-level--${s.levelColor}`}>
                            {s.level}
                          </span>
                        )}
                      </td>
                    ) : (
                      <td key={day} className="schedule-cell schedule-cell--empty" />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="schedule-mobile">
          {days.map((day) => (
            <div key={day} className="schedule-day-card">
              <h3 className="schedule-day-title">{day}</h3>
              <div className="schedule-day-slots">
                {times.map((time) => {
                  const s = schedule[day]?.[time] ?? null;
                  return s ? (
                    <div
                      key={time}
                      className={`schedule-mobile-slot schedule-cell--${s.color}`}
                    >
                      <span className="schedule-mobile-time">{time}</span>
                      <strong>{s.label}</strong>
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
