import Weather from "./Weather";

export default function Hero() {
  return (
    <div className="hero-copy">
      <div className="eyebrow">🏐 Private sand court • Fairfax, VA</div>
      <h1>Playa de Pineland</h1>
      <p>
        Your Backyard Beach Volleyball Experience. Private coaching and small
        group training on a premium backyard sand court built for skill
        development, competition, and fun.
      </p>

      <div className="hero-actions">
        <a
          className="btn btn-primary"
          href="https://calendly.com/playadepineland/open-play"
          target="_blank"
        >
          Join Open Play
        </a>
        <a className="btn btn-secondary" href="#training">
          Explore Training
        </a>
      </div>

      <Weather />

      <div className="hero-stats">
        <div className="stat">
          <strong>Private</strong>
          <span>
            Train on a dedicated backyard sand court, away from crowded public
            spaces.
          </span>
        </div>
        <div className="stat">
          <strong>Focused</strong>
          <span>
            Build technique, movement, and confidence with intentional reps.
          </span>
        </div>
        <div className="stat">
          <strong>Flexible</strong>
          <span>
            Great for 1-on-1 sessions, partner work, and small groups.
          </span>
        </div>
      </div>
    </div>
  );
}
