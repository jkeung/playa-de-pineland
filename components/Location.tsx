export default function Location() {
  return (
    <section className="section" id="location">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Find Us</h2>
            <p>
              A private backyard sand court in Fairfax, VA. Come play where the
              grass meets the sand.
            </p>
          </div>
        </div>

        <div className="split">
          <div className="location-info">
            <div className="location-detail">
              <h3>📍 Address</h3>
              <p>
                Fairfax, VA 22031
              </p>
            </div>

            <div className="location-detail">
              <h3>🕐 Hours</h3>
              <ul className="location-hours">
                <li><strong>Mon – Fri:</strong> 7:00 AM – 8:00 PM</li>
                <li><strong>Saturday:</strong> 8:00 AM – 6:00 PM</li>
                <li><strong>Sunday:</strong> 9:00 AM – 4:00 PM</li>
              </ul>
            </div>

            <div className="location-detail">
              <h3>📞 Contact</h3>
              <p>
                <a href="mailto:playadepineland@gmail.com">playadepineland@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="location-card">
            <div className="location-map-placeholder">
              <span className="location-pin">📍</span>
              <span className="location-map-label">Playa de Pineland</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
