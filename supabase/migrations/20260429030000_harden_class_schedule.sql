-- Keep admin management, public roster display, and capacity limits aligned with
-- the native class scheduling UI.

CREATE POLICY "Admins can view all class sessions"
  ON public.class_sessions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.is_admin = true
    )
  );

CREATE OR REPLACE VIEW public.class_registration_roster AS
SELECT
  cr.class_session_id,
  COALESCE(NULLIF(p.display_name, ''), 'Player') AS display_name
FROM public.class_registrations cr
JOIN public.profiles p
  ON p.id = cr.user_id;

GRANT SELECT ON public.class_registration_roster TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.enforce_class_registration_capacity()
RETURNS TRIGGER AS $$
DECLARE
  session_capacity INTEGER;
  registration_count INTEGER;
BEGIN
  SELECT capacity
  INTO session_capacity
  FROM public.class_sessions
  WHERE id = NEW.class_session_id
    AND is_active = true
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Class not found or inactive';
  END IF;

  SELECT COUNT(*)
  INTO registration_count
  FROM public.class_registrations
  WHERE class_session_id = NEW.class_session_id;

  IF registration_count >= session_capacity THEN
    RAISE EXCEPTION 'Class is full';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER enforce_class_registration_capacity
  BEFORE INSERT ON public.class_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_class_registration_capacity();
