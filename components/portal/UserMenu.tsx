"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function UserMenu() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  if (user) {
    return (
      <Link href="/portal" className="btn btn-secondary user-menu-btn">
        My Portal
      </Link>
    );
  }

  return (
    <Link href="/portal/login" className="btn btn-secondary user-menu-btn">
      Sign In
    </Link>
  );
}
