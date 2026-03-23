export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-newsletter">
          <div className="footer-newsletter-copy">
            <strong>Stay in the loop</strong>
            <span>Get updates on open play sessions, events, and tips.</span>
          </div>
          <form className="footer-newsletter-form" action="#">
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
        <div className="footer-inner">
          <div>&copy; {new Date().getFullYear()} Playa de Pineland</div>
          <div>Your Backyard Beach Volleyball Experience</div>
        </div>
      </div>
    </footer>
  );
}
