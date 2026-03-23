-- Add admin flag to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create announcements table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'weather', 'event', 'maintenance')),
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Everyone can read announcements
CREATE POLICY "Anyone can read announcements"
  ON announcements FOR SELECT
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert announcements"
  ON announcements FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Only admins can update
CREATE POLICY "Admins can update announcements"
  ON announcements FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Only admins can delete
CREATE POLICY "Admins can delete announcements"
  ON announcements FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Flag initial admin
UPDATE profiles SET is_admin = true
WHERE id = (SELECT id FROM auth.users WHERE email = 'jaysonwun@gmail.com');
