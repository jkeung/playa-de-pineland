"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "@/app/portal/actions";

type Profile = {
  display_name: string;
  phone: string;
  bio: string;
  level: string;
};

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

  return (
    <form action={formAction} className="profile-form">
      <div className="portal-form-group">
        <label htmlFor="display_name">Display Name</label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          defaultValue={profile.display_name}
          className="portal-form-input"
          placeholder="How you want to be known"
        />
      </div>

      <div className="portal-form-group">
        <label htmlFor="phone">Phone</label>
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

      <div className="portal-form-group">
        <label htmlFor="level">Level</label>
        <select
          id="level"
          name="level"
          defaultValue={profile.level}
          className="portal-form-input"
        >
          <option value="B">B — Beginner</option>
          <option value="BB">BB — Intermediate</option>
          <option value="A">A — Advanced</option>
          <option value="AA">AA — Elite</option>
        </select>
      </div>

      <div className="portal-form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio}
          className="portal-form-input portal-form-textarea"
          placeholder="Tell us about your volleyball journey..."
          rows={4}
        />
      </div>

      {state?.error && (
        <div className="auth-error">{state.error}</div>
      )}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
