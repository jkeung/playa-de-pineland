type Session = {
  time: string;
  label: string;
  color: string;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const schedule: Record<string, Session[]> = {
  Mon: [
    { time: "7:00 AM", label: "Open Play", color: "ocean" },
    { time: "10:00 AM", label: "Group Clinic", color: "sunset" },
    { time: "4:00 PM", label: "Kids Camp", color: "palm" },
    { time: "6:00 PM", label: "Open Play", color: "ocean" },
  ],
  Tue: [
    { time: "8:00 AM", label: "Private Lesson", color: "sand" },
    { time: "10:00 AM", label: "Open Play", color: "ocean" },
    { time: "4:00 PM", label: "Group Clinic", color: "sunset" },
    { time: "6:00 PM", label: "Open Play", color: "ocean" },
  ],
  Wed: [
    { time: "7:00 AM", label: "Open Play", color: "ocean" },
    { time: "10:00 AM", label: "Group Clinic", color: "sunset" },
    { time: "2:00 PM", label: "Private Lesson", color: "sand" },
    { time: "4:00 PM", label: "Kids Camp", color: "palm" },
  ],
  Thu: [
    { time: "8:00 AM", label: "Private Lesson", color: "sand" },
    { time: "10:00 AM", label: "Open Play", color: "ocean" },
    { time: "4:00 PM", label: "Group Clinic", color: "sunset" },
    { time: "6:00 PM", label: "Open Play", color: "ocean" },
  ],
  Fri: [
    { time: "7:00 AM", label: "Open Play", color: "ocean" },
    { time: "10:00 AM", label: "Group Clinic", color: "sunset" },
    { time: "4:00 PM", label: "Kids Camp", color: "palm" },
    { time: "6:00 PM", label: "Open Play", color: "ocean" },
  ],
  Sat: [
    { time: "8:00 AM", label: "Open Play", color: "ocean" },
    { time: "10:00 AM", label: "Group Clinic", color: "sunset" },
    { time: "12:00 PM", label: "Kids Camp", color: "palm" },
    { time: "2:00 PM", label: "Private Lesson", color: "sand" },
  ],
};

export default function Schedule() {
  return (
    <section className="section" id="schedule">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Weekly Schedule</h2>
            <p>
              Find the right session for your week. From morning open play to
              evening clinics, there&rsquo;s always court time available.
            </p>
          </div>
        </div>

        <div className="schedule-scroll">
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
              {[0, 1, 2, 3].map((row) => (
                <tr key={row}>
                  <td className="schedule-time">
                    {schedule.Mon[row]?.time ?? ""}
                  </td>
                  {days.map((day) => {
                    const s = schedule[day][row];
                    return s ? (
                      <td key={day} className={`schedule-cell schedule-cell--${s.color}`}>
                        <strong>{s.label}</strong>
                        <span>{s.time}</span>
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
      </div>
    </section>
  );
}
