-- Allow admins to add existing players or guest names to class registrations.

ALTER TABLE public.class_registrations
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.class_registrations
  ADD COLUMN IF NOT EXISTS guest_name TEXT;

ALTER TABLE public.class_registrations
  DROP CONSTRAINT IF EXISTS class_registrations_user_or_guest_check;

ALTER TABLE public.class_registrations
  ADD CONSTRAINT class_registrations_user_or_guest_check
  CHECK (
    user_id IS NOT NULL
    OR NULLIF(BTRIM(guest_name), '') IS NOT NULL
  );

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin_user());

DROP POLICY IF EXISTS "Admins can insert class registrations" ON public.class_registrations;

CREATE POLICY "Admins can insert class registrations"
  ON public.class_registrations
  FOR INSERT
  WITH CHECK (public.is_admin_user());

CREATE OR REPLACE VIEW public.class_registration_roster AS
SELECT
  cr.class_session_id,
  COALESCE(NULLIF(BTRIM(cr.guest_name), ''), NULLIF(p.display_name, ''), 'Player') AS display_name
FROM public.class_registrations cr
LEFT JOIN public.profiles p
  ON p.id = cr.user_id;

GRANT SELECT ON public.class_registration_roster TO anon, authenticated;
