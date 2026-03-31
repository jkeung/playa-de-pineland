"use client";

import { useActionState } from "react";
import { createAnnouncement } from "@/app/portal/actions";

export default function AnnouncementForm() {
  const [state, formAction, pending] = useActionState(createAnnouncement, null);

  return (
    <form action={formAction} className="flex flex-col gap-[18px]">
      {state?.error && (
        <div className="py-3 px-4 rounded-xl bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] text-[#dc2626] text-[0.9rem] dark:bg-[rgba(220,38,38,0.12)] dark:border-[rgba(220,38,38,0.25)] dark:text-[#f87171]">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="title" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="portal-form-input"
          placeholder="Announcement title"
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="body" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Body</label>
        <textarea
          id="body"
          name="body"
          required
          className="portal-form-input resize-y min-h-[100px]"
          placeholder="What do you want to share?"
          rows={4}
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="category" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Category</label>
        <select id="category" name="category" className="portal-form-input">
          <option value="general">General</option>
          <option value="weather">Weather</option>
          <option value="event">Event</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="flex items-center gap-2 text-[0.92rem] cursor-pointer">
          <input
            type="checkbox"
            name="pinned"
            value="true"
            className="w-[18px] h-[18px] accent-[var(--ocean)] cursor-pointer"
          />
          <span>Pin this announcement</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Posting..." : "Post Announcement"}
      </button>
    </form>
  );
}
