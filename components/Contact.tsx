export default function Contact() {
  return (
    <section className="pt-[58px] pb-20" id="contact">
      <div className="container">
        <div
          className="cta-box text-white rounded-[34px] p-[34px] shadow-[0_24px_60px_rgba(8,57,72,0.28)] flex items-center justify-between gap-6 flex-wrap max-md:p-[26px] flex-col items-stretch"
        >
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h2 className="m-0 mb-[10px] text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em]">
                Ready to train at Playa de Pineland?
              </h2>
              <p className="m-0 max-w-[700px] text-white/80 leading-[1.75]">
                Reach out to book a session, ask about availability, or learn more
                about private coaching and small group training.
              </p>
            </div>
            <a className="btn btn-secondary" href="mailto:playadepineland@gmail.com">
              Email Us
            </a>
          </div>

          <form className="grid gap-[18px] max-w-[640px] mx-auto mt-7 w-full" action="#">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.9rem] font-semibold text-white/80" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="py-[14px] px-4 rounded-[14px] border border-white/[0.18] bg-white/10 text-white font-[inherit] text-[0.97rem] transition-[border-color,background] duration-200 placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/[0.15]"
                placeholder="Your name"
                required
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.9rem] font-semibold text-white/80" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="py-[14px] px-4 rounded-[14px] border border-white/[0.18] bg-white/10 text-white font-[inherit] text-[0.97rem] transition-[border-color,background] duration-200 placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/[0.15]"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.9rem] font-semibold text-white/80" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="py-[14px] px-4 rounded-[14px] border border-white/[0.18] bg-white/10 text-white font-[inherit] text-[0.97rem] transition-[border-color,background] duration-200 placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/[0.15] resize-y min-h-[100px]"
                placeholder="What are you interested in?"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary justify-self-start">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
