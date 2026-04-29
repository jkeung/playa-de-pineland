-- Add explicit event dates so admins can manage real calendar events while
-- keeping day_of_week available for the weekly public schedule layout.

ALTER TABLE public.class_sessions
  ADD COLUMN IF NOT EXISTS session_date DATE;

UPDATE public.class_sessions
SET session_date = (
  CURRENT_DATE
  - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER
  + day_of_week
)
WHERE session_date IS NULL;

UPDATE public.class_sessions
SET session_date = session_date + 7
WHERE session_date < CURRENT_DATE;

ALTER TABLE public.class_sessions
  ALTER COLUMN session_date SET NOT NULL;

CREATE INDEX IF NOT EXISTS class_sessions_session_date_idx
  ON public.class_sessions (session_date, start_time);
