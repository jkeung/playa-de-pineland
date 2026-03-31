"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, signup, loginWithProvider } from "@/app/portal/actions";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const [state, formAction, pending] = useActionState(
    isLogin ? login : signup,
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-5">
      <div className="card w-full max-w-[420px] py-9 px-8 max-md:py-7 max-md:px-[22px]">
        <div className="text-center mb-7">
          <Link
            href="/"
            className="text-[1.4rem] font-extrabold text-[color:var(--ocean-dark)] no-underline tracking-[-0.04em] inline-block mb-[18px] dark:text-heading-dark"
          >
            Playa de <span className="text-[color:var(--sunset)]">Pineland</span>
          </Link>
          <h1 className="text-[1.6rem] m-0 mb-[6px] text-[color:var(--ocean-dark)] dark:text-heading-dark">
            {isLogin ? "Welcome Back" : "Join the Court"}
          </h1>
          <p className="m-0 text-[color:var(--muted)] text-[0.95rem]">
            {isLogin ? "Sign in to your player portal" : "Create your player account"}
          </p>
        </div>

        <div className="flex flex-col gap-[10px] mb-1">
          <form action={() => loginWithProvider("google")} style={{ display: "contents" }}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-[10px] py-[11px] px-[18px] rounded-[14px] border border-[rgba(8,57,72,0.12)] bg-[rgba(248,250,244,0.7)] text-[color:var(--text)] font-[inherit] text-[0.92rem] font-medium cursor-pointer transition-[background,border-color,transform] duration-200 hover:bg-[rgba(248,250,244,0.95)] hover:border-[rgba(8,57,72,0.2)] hover:-translate-y-[1px] dark:bg-[rgba(255,255,255,0.06)] dark:border-[rgba(255,255,255,0.1)] dark:text-[#e8e6e1] dark:hover:bg-[rgba(255,255,255,0.1)] dark:hover:border-[rgba(255,255,255,0.18)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </form>
          <form action={() => loginWithProvider("facebook")} style={{ display: "contents" }}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-[10px] py-[11px] px-[18px] rounded-[14px] border border-[rgba(8,57,72,0.12)] bg-[rgba(248,250,244,0.7)] text-[color:var(--text)] font-[inherit] text-[0.92rem] font-medium cursor-pointer transition-[background,border-color,transform] duration-200 hover:bg-[rgba(248,250,244,0.95)] hover:border-[rgba(8,57,72,0.2)] hover:-translate-y-[1px] dark:bg-[rgba(255,255,255,0.06)] dark:border-[rgba(255,255,255,0.1)] dark:text-[#e8e6e1] dark:hover:bg-[rgba(255,255,255,0.1)] dark:hover:border-[rgba(255,255,255,0.18)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Continue with Facebook
            </button>
          </form>
          <form action={() => loginWithProvider("apple")} style={{ display: "contents" }}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-[10px] py-[11px] px-[18px] rounded-[14px] border border-[rgba(8,57,72,0.12)] bg-[rgba(248,250,244,0.7)] text-[color:var(--text)] font-[inherit] text-[0.92rem] font-medium cursor-pointer transition-[background,border-color,transform] duration-200 hover:bg-[rgba(248,250,244,0.95)] hover:border-[rgba(8,57,72,0.2)] hover:-translate-y-[1px] dark:bg-[rgba(255,255,255,0.06)] dark:border-[rgba(255,255,255,0.1)] dark:text-[#e8e6e1] dark:hover:bg-[rgba(255,255,255,0.1)] dark:hover:border-[rgba(255,255,255,0.18)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Continue with Apple
            </button>
          </form>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form action={formAction} className="flex flex-col gap-[18px]">
          {!isLogin && (
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="full_name" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Full Name</label>
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

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="email" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="portal-form-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="password" className="text-[0.9rem] font-semibold text-[color:var(--text)]">Password</label>
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

          {state?.error && (
            <div className="py-3 px-4 rounded-xl bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] text-[#dc2626] text-[0.9rem] dark:bg-[rgba(220,38,38,0.12)] dark:border-[rgba(220,38,38,0.25)] dark:text-[#f87171]">
              {state.error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full mt-1" disabled={pending}>
            {pending ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <p className="text-center mt-5 text-[color:var(--muted)] text-[0.9rem]">
          {isLogin ? (
            <>Don&apos;t have an account? <Link href="/portal/signup" className="text-[color:var(--ocean)] font-semibold no-underline hover:underline">Sign up</Link></>
          ) : (
            <>Already have an account? <Link href="/portal/login" className="text-[color:var(--ocean)] font-semibold no-underline hover:underline">Sign in</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
