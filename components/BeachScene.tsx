export default function BeachScene() {
  return (
    <div className="hero-card">
      {/* Sun with glow */}
      <div className="sun"></div>

      {/* Drifting clouds */}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
      <div className="cloud cloud-4"></div>
      <div className="cloud cloud-5"></div>

      {/* Ocean waves */}
      <div className="court-scene"></div>
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>

      {/* Sand */}
      <div className="sand"></div>

      {/* Palm trees */}
      <div className="palm left">
        <div className="trunk"></div>
        <div className="leaves">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
      </div>

      <div className="palm right">
        <div className="trunk"></div>
        <div className="leaves">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
      </div>

      {/* Net + poles */}
      <div className="net">
        <div className="pole left"></div>
        <div className="mesh"></div>
        <div className="pole right"></div>
      </div>
    </div>
  );
}
