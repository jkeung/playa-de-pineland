export default function Footer() {
  return (
    <footer className="pb-[34px] text-[color:var(--muted)] text-[0.94rem]">
      <div className="container">
        {/* Newsletter */}
        <div className="flex items-center justify-between gap-6 py-7 mb-[18px] border-b border-[rgba(8,57,72,0.08)] dark:border-[rgba(255,255,255,0.06)] flex-wrap max-sm:flex-col max-sm:items-start">
          <div className="flex flex-col gap-1">
            <strong className="text-[1.1rem] text-[color:var(--ocean-dark)] dark:text-heading-dark">Stay in the loop</strong>
            <span className="text-[color:var(--muted)] text-[0.92rem]">Get updates on open play sessions, events, and tips.</span>
          </div>
          <form className="flex gap-2.5 max-sm:w-full" action="#">
            <input
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
        {/* Copyright */}
        <div className="flex justify-between gap-4 flex-wrap">
          <div>&copy; {new Date().getFullYear()} Playa de Pineland</div>
          <div>Your Backyard Beach Volleyball Experience</div>
        </div>
      </div>
    </footer>
  );
}
