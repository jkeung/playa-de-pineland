export default function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-box cta-box--contact">
          <div className="cta-box-header">
            <div>
              <h2>Ready to train at Playa de Pineland?</h2>
              <p>
                Reach out to book a session, ask about availability, or learn more
                about private coaching and small group training.
              </p>
            </div>
            <a className="btn btn-secondary" href="mailto:playadepineland@gmail.com">
              Email Us
            </a>
          </div>

          <form className="contact-form" action="#">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="What are you interested in?"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
