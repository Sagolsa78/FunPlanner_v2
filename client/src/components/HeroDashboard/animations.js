const baseDelay = 0.2;

// Positions in pixels (example values – tweak them later)
const positions = [
  { top: 40, left: 0 },      // sidebar.png
  { top: 40, left: 260 },     // topbar.png
  { top: 90, left: 267 },    // HeroSection1.png
  { top: 195, left: 267 },   // HeroSection2.1.png
  { top: 195, left: 495 },   // HeroSection2.2.png
  { top: 195, left: 710 },   // HeroSection2.3.png
  { top: 195, left: 930 },   // HeroSection2.4.png
  { top: 195, left: 1142 },   // HeroSection2.5.png
  { top: 322, left: 268 },   // HeroSection3.1.png
  { top: 322, left: 997 },   // HeroSection3.2.png
  { top: 550, left: 270 },   // HeroSection4.png
];

const dashboardSlices = positions.map((pos, i) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: i * baseDelay,
    duration: 1.0,
    ease: 'easeOut',
  },
  style: {
    position: 'absolute',
    top: `${pos.top}px`,
    left: `${pos.left}px`,
    width: 'auto',
    height: 'auto',
  },
}));

export default dashboardSlices;
