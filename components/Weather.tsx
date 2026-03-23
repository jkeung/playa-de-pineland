export default function Weather() {
  return (
    <div className="weather-widget">
      <div className="weather-main">
        <span className="weather-icon">☀️</span>
        <span className="weather-temp">82°F</span>
      </div>
      <div className="weather-details">
        <span>Sunny</span>
        <span>💧 65%</span>
        <span>💨 8 mph</span>
      </div>
      <div className="weather-location">📍 Fairfax, VA</div>
    </div>
  );
}
