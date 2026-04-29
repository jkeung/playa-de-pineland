"use client";

import { useActionState, useMemo, useState } from "react";
import { createJournalEntry, deleteJournalEntry, updateJournalEntry } from "@/app/portal/actions";

type JournalEntry = {
  id: string;
  entry_date: string;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function todayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function tagsInputValue(tags: string[]) {
  return tags.join(", ");
}

export default function JournalForm({ entries }: { entries: JournalEntry[] }) {
  const [state, formAction, pending] = useActionState(createJournalEntry, null);
  const [query, setQuery] = useState("");
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const editingEntry = entries.find((entry) => entry.id === editingEntryId) ?? null;
  const filteredEntries = useMemo(() => (
    entries.filter((entry) => {
      if (!normalizedQuery) return true;

      const searchable = [
        entry.title,
        entry.body,
        entry.entry_date,
        dateFormatter.format(new Date(`${entry.entry_date}T12:00:00`)),
        ...entry.tags,
      ].join(" ").toLowerCase();

      return searchable.includes(normalizedQuery);
    })
  ), [entries, normalizedQuery]);

  return (
    <section className="card p-6 mt-7">
      <div className="mb-5">
        <h2 className="m-0 text-[1.2rem] text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Training Journal</h2>
        <p className="m-0 mt-1 text-[0.92rem] text-[color:var(--muted)]">
          Private dated notes for your practices, games, goals, and takeaways.
        </p>
      </div>

      <form action={formAction} className="grid gap-4 mb-6">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 max-md:grid-cols-1">
          <label className="grid gap-2 text-sm font-semibold">
            Date
            <input type="date" name="entry_date" defaultValue={todayInputValue()} required className="portal-form-input" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Tags
            <input name="tags" className="portal-form-input" placeholder="serving, defense, tournament" />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold">
          Title
          <input name="title" className="portal-form-input" placeholder="Optional title" />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Notes
          <textarea
            name="body"
            className="portal-form-input portal-form-textarea w-full min-h-[160px]"
            placeholder="Capture what you worked on, what felt good, what to improve, or notes from your last session..."
            rows={7}
            required
          />
        </label>

        {state?.error && (
          <div className="py-3 px-4 rounded-xl bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] text-[#dc2626] text-[0.9rem] dark:bg-[rgba(220,38,38,0.12)] dark:border-[rgba(220,38,38,0.25)] dark:text-[#f87171]">
            {state.error}
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Saving..." : "Add Entry"}
          </button>
        </div>
      </form>

      {editingEntry ? (
        <form action={updateJournalEntry.bind(null, editingEntry.id)} className="grid gap-4 mb-6 rounded-lg border border-[var(--border)] p-5 bg-[rgba(255,255,255,0.22)] dark:bg-[rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="m-0 text-base text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Edit Entry</h3>
              <p className="m-0 mt-1 text-[0.85rem] text-[color:var(--muted)]">{formatDateLabel(editingEntry.entry_date)}</p>
            </div>
            <button type="button" className="btn btn-secondary !py-2 !px-4" onClick={() => setEditingEntryId(null)}>
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 max-md:grid-cols-1">
            <label className="grid gap-2 text-sm font-semibold">
              Date
              <input type="date" name="entry_date" defaultValue={editingEntry.entry_date} required className="portal-form-input" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Tags
              <input name="tags" defaultValue={tagsInputValue(editingEntry.tags)} className="portal-form-input" placeholder="serving, defense, tournament" />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold">
            Title
            <input name="title" defaultValue={editingEntry.title} className="portal-form-input" placeholder="Optional title" />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Notes
            <textarea
              name="body"
              defaultValue={editingEntry.body}
              className="portal-form-input portal-form-textarea w-full min-h-[160px]"
              placeholder="Capture what you worked on, what felt good, what to improve, or notes from your last session..."
              rows={7}
              required
            />
          </label>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => setEditingEntryId(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : null}

      <div className="border-t border-[var(--border)] pt-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h3 className="m-0 text-base text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">Entries</h3>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="portal-form-input min-w-[260px] max-sm:min-w-0 max-sm:w-full"
            placeholder="Search notes, tags, or dates"
          />
        </div>

        {filteredEntries.length ? (
          <div className="grid gap-3">
            {filteredEntries.map((entry) => (
              <article key={entry.id} className="rounded-lg border border-[var(--border)] bg-[rgba(255,255,255,0.35)] p-4 dark:bg-[rgba(255,255,255,0.04)]">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <p className="m-0 text-sm font-bold text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">
                      {dateFormatter.format(new Date(`${entry.entry_date}T12:00:00`))}
                    </p>
                    {entry.title && <h4 className="m-0 mt-1 text-base text-[color:var(--text)]">{entry.title}</h4>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="btn btn-secondary !py-1 !px-3 !text-[0.78rem]" onClick={() => setEditingEntryId(entry.id)}>
                      Edit
                    </button>
                    <form action={deleteJournalEntry.bind(null, entry.id)}>
                      <button type="submit" className="btn btn-secondary !py-1 !px-3 !text-[0.78rem]">Delete</button>
                    </form>
                  </div>
                </div>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[rgba(30,107,72,0.12)] px-3 py-1 text-xs font-bold text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="m-0 whitespace-pre-wrap text-[0.92rem] leading-[1.7] text-[color:var(--muted)]">{entry.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="m-0 text-[0.92rem] text-[color:var(--muted)]">
            {entries.length ? "No journal entries match your search." : "No journal entries yet."}
          </p>
        )}
      </div>
    </section>
  );
}
