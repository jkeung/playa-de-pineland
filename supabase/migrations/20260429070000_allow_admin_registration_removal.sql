-- Allow admins to remove individual registrations while preserving the class session.

CREATE POLICY "Admins can delete class registrations"
  ON public.class_registrations
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.is_admin = true
    )
  );
