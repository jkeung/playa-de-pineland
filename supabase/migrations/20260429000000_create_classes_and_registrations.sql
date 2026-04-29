-- Create class sessions and registrations so members can sign up and appear on schedule.

CREATE TABLE public.class_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    level TEXT NOT NULL DEFAULT 'B' CHECK (level IN ('B', 'BB', 'A', 'AA')),
    capacity INTEGER NOT NULL DEFAULT 16 CHECK (capacity > 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.class_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_session_id UUID NOT NULL REFERENCES public.class_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(class_session_id, user_id)
);

ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active class sessions"
  ON public.class_sessions
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view registrations"
  ON public.class_registrations
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create own registration"
  ON public.class_registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own registration"
  ON public.class_registrations
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_class_session_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_class_session_updated
  BEFORE UPDATE ON public.class_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_class_session_updated_at();

INSERT INTO public.class_sessions (title, description, day_of_week, start_time, level, capacity)
VALUES
  ('Open Play', 'All skill levels welcome.', 1, '18:00', 'B', 20),
  ('Open Play', 'All skill levels welcome.', 2, '18:00', 'BB', 20),
  ('Group Clinic', 'Coached drills and game play.', 3, '18:00', 'B', 16),
  ('Open Play', 'All skill levels welcome.', 4, '18:00', 'A', 20),
  ('Group Clinic', 'Coached drills and game play.', 5, '18:00', 'BB', 16);
