-- Apply the admin policy recursion fix to databases where the prior migration
-- was already marked as applied.

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
