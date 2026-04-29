-- Private player journal for notes and reflections in the profile.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS journal TEXT DEFAULT '';
