-- Ensure registrations can join directly to profiles for attendee names.

ALTER TABLE public.class_registrations
  DROP CONSTRAINT IF EXISTS class_registrations_user_id_fkey;

ALTER TABLE public.class_registrations
  ADD CONSTRAINT class_registrations_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES public.profiles(id)
  ON DELETE CASCADE;
