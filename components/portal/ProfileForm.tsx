"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "@/app/portal/actions";

type Profile = {
  display_name: string;
  phone: string;
  bio: string;
  level: string;
};

const levels = [
  {
    value: "B",
    name: "B — Beginner",
    description:
      "New to beach doubles. Learning bump, set, spike fundamentals, serving, and basic 2v2 positioning.",
  },
  {
    value: "BB",
    name: "BB — Intermediate",
    description:
      "Reliable pass-set-hit sequences, consistent serves, and good court coverage with your partner.",
  },
  {
    value: "A",
    name: "A — Advanced",
    description:
      "Strong shot selection, hand signals, defensive schemes, and solid serving & serve-receive as a team.",
  },
  {
    value: "AA",
    name: "AA — Elite",
    description:
      "Top-tier amateur play — dominant serving, seamless partner chemistry, and consistent performance under pressure.",
  },
];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(updateProfile, null);
  const [phone, setPhone] = useState(formatPhone(profile.phone));
  const [selectedLevel, setSelectedLevel] = useState(profile.level || "B");

  return (
    <form action={formAction} className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-[6px]">
        <label htmlFor="display_name" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Display Name</label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          defaultValue={profile.display_name}
          className="portal-form-input"
          placeholder="How you want to be known"
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="phone" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="portal-form-input"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="text-[0.9rem] font-semibold text-[color:var(--text)]">Skill Level</label>
        <input type="hidden" name="level" value={selectedLevel} />
        <div className="level-picker">
          {levels.map((level) => (
            <button
              key={level.value}
              type="button"
              className={`level-option${selectedLevel === level.value ? " level-option--selected" : ""}`}
              onClick={() => setSelectedLevel(level.value)}
            >
              <div className="level-option-header">
                <span className="level-option-badge">{level.value}</span>
                <span className="level-option-name">{level.name}</span>
              </div>
              <p className="level-option-desc">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="bio" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Bio</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio}
          className="portal-form-input resize-y min-h-[100px]"
          placeholder="Tell us about your volleyball journey..."
          rows={4}
        />
      </div>

      {state?.error && (
        <div className="py-3 px-4 rounded-xl bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] text-[#dc2626] text-[0.9rem] dark:bg-[rgba(220,38,38,0.12)] dark:border-[rgba(220,38,38,0.25)] dark:text-[#f87171]">
          {state.error}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
