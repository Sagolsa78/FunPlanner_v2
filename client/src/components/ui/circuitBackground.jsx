const CircuitBackground = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1280 700"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-pulse"
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00ffff" />
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00ffff" />
      </filter>
    </defs>

    {/* Sample Circuit Lines */}
    <g filter="url(#glow)" stroke="#00ffff" strokeWidth="1.5">
      <path d="M 200 100 L 400 100 L 400 300" />
      <path d="M 600 50 L 600 200 L 800 200" />
      <circle cx="400" cy="300" r="5" fill="#00ffff" />
      <circle cx="800" cy="200" r="5" fill="#00ffff" />
    </g>
  </svg>
);
export default CircuitBackground;