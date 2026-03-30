"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { login, signup, loginWithProvider } from "@/app/portal/actions";

const levels = [
  {
    value: "B",
    name: "B — Beginner",
    description:
      "New to beach doubles. Learning bump, set, spike fundamentals, serving, and basic 2v2 positioning.",
  },
  {
    value: "BB",
    name: "BB — Intermediate",
    description:
      "Reliable pass-set-hit sequences, consistent serves, and good court coverage with your partner.",
  },
  {
    value: "A",
    name: "A — Advanced",
    description:
      "Strong shot selection, hand signals, defensive schemes, and solid serving & serve-receive as a team.",
  },
  {
    value: "AA",
    name: "AA — Elite",
    description:
      "Top-tier amateur play — dominant serving, seamless partner chemistry, and consistent performance under pressure.",
  },
];

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const [state, formAction, pending] = useActionState(
    isLogin ? login : signup,
    null
  );
  const [selectedLevel, setSelectedLevel] = useState("B");

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <Link href="/" className="auth-brand">
            Playa de <span>Pineland</span>
          </Link>
          <h1>{isLogin ? "Welcome Back" : "Join the Court"}</h1>
          <p>{isLogin ? "Sign in to your player portal" : "Create your player account"}</p>
        </div>

        <div className="auth-social">
          <form action={() => loginWithProvider("google")}>
            <button type="submit" className="btn auth-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </form>
          <form action={() => loginWithProvider("facebook")}>
            <button type="submit" className="btn auth-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Continue with Facebook
            </button>
          </form>
          <form action={() => loginWithProvider("apple")}>
            <button type="submit" className="btn auth-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Continue with Apple
            </button>
          </form>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form action={formAction} className="auth-form">
          {!isLogin && (
            <div className="portal-form-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                className="portal-form-input"
                placeholder="Your full name"
              />
            </div>
          )}

          <div className="portal-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="portal-form-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="portal-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="portal-form-input"
              placeholder="At least 6 characters"
            />
          </div>

          {!isLogin && (
            <div className="portal-form-group">
              <label>Skill Level</label>
              <input type="hidden" name="level" value={selectedLevel} />
              <div className="level-picker">
                {levels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    className={`level-option${selectedLevel === level.value ? " level-option--selected" : ""}`}
                    onClick={() => setSelectedLevel(level.value)}
                  >
                    <div className="level-option-header">
                      <span className="level-option-badge">{level.value}</span>
                      <span className="level-option-name">{level.name}</span>
                    </div>
                    <p className="level-option-desc">{level.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {state?.error && (
            <div className="auth-error">{state.error}</div>
          )}

          <button type="submit" className="btn btn-primary auth-submit" disabled={pending}>
            {pending ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? (
            <>Don&apos;t have an account? <Link href="/portal/signup">Sign up</Link></>
          ) : (
            <>Already have an account? <Link href="/portal/login">Sign in</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
