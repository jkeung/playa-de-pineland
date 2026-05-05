-- Add end times to class sessions and prevent overlapping ranges on the same date.

ALTER TABLE public.class_sessions
  ADD COLUMN IF NOT EXISTS end_time TIME;

UPDATE public.class_sessions
SET end_time = COALESCE(end_time, (start_time + INTERVAL '1 hour')::time);

ALTER TABLE public.class_sessions
  ALTER COLUMN end_time SET NOT NULL;

ALTER TABLE public.class_sessions
  DROP CONSTRAINT IF EXISTS class_sessions_time_range_check;

ALTER TABLE public.class_sessions
  ADD CONSTRAINT class_sessions_time_range_check
  CHECK (end_time > start_time);

DROP INDEX IF EXISTS class_sessions_session_date_start_time_unique;

CREATE OR REPLACE FUNCTION public.enforce_class_session_no_overlap()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(NEW.session_date::text)::bigint);

  IF NEW.end_time <= NEW.start_time THEN
    RAISE EXCEPTION 'End time must be after start time';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.class_sessions cs
    WHERE cs.session_date = NEW.session_date
      AND (TG_OP = 'INSERT' OR cs.id <> NEW.id)
      AND cs.start_time < NEW.end_time
      AND cs.end_time > NEW.start_time
  ) THEN
    RAISE EXCEPTION 'Class times cannot overlap';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS enforce_class_session_no_overlap ON public.class_sessions;

CREATE TRIGGER enforce_class_session_no_overlap
  BEFORE INSERT OR UPDATE ON public.class_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_class_session_no_overlap();
