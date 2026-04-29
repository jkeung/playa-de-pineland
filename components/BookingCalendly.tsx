import Link from "next/link";

export default function BookingCalendly() {
  return (
    <section className="pt-[42px] pb-[22px]" id="booking">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Join a Class</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Create an account, sign up for a class, and your name appears on the weekly schedule.
            </p>
          </div>
        </div>
        <div className="rounded-[var(--radius)] p-8 shadow-[var(--shadow)] bg-[var(--card)] border border-[var(--border)]">
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/portal/signup">Create Account</Link>
            <Link className="btn btn-secondary" href="/portal/login">Log In</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
