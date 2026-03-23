"use client";

import { useActionState } from "react";
import { createAnnouncement } from "@/app/portal/actions";

export default function AnnouncementForm() {
  const [state, formAction, pending] = useActionState(createAnnouncement, null);

  return (
    <form action={formAction} className="announcement-form">
      {state?.error && <div className="auth-error">{state.error}</div>}

      <div className="portal-form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="portal-form-input"
          placeholder="Announcement title"
        />
      </div>

      <div className="portal-form-group">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          required
          className="portal-form-input portal-form-textarea"
          placeholder="What do you want to share?"
          rows={4}
        />
      </div>

      <div className="portal-form-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" className="portal-form-input">
          <option value="general">General</option>
          <option value="weather">Weather</option>
          <option value="event">Event</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="portal-form-group">
        <label className="announcement-checkbox-label">
          <input type="checkbox" name="pinned" value="true" />
          <span>Pin this announcement</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Posting..." : "Post Announcement"}
      </button>
    </form>
  );
}
