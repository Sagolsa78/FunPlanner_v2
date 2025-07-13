import { motion } from 'framer-motion';
import dashboardSlices from './animations';

const HeroDashboard = () => {
  const parts = [
    'sidebar.png',
    'topbar.png',
    'HeroSection1.png',
    'HeroSection2.1.png',
    'HeroSection2-2.png',
    'HeroSection2.3.png',
    'HeroSection2.4.png',
    'HeroSection2.5.png',
    'HeroSection3.1.png',
    'HeroSection3.2.png',
    'HeroSection4.png',
  ];

  return (
  <div className=" w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[620px] bg-gray-950 overflow-hidden flex justify-center items-center px-4">
  <div className="w-full max-w-[1100px] relative ">
    <div
      className="relative w-full h-auto origin-top-left"
      style={{ width: 1100, height: 679, transform: 'scale(0.8)' }}
    >
      {parts.map((part, index) => (
        <motion.img
          key={part}
          src={`/assets/dashboard-slices/${part}`}
          alt={`dashboard-part-${index}`}
          {...dashboardSlices[index]}
         className="w-full h-auto shadow-lg absolute top-0 left-0"
          whileHover={{
            scale: 1.03,
            filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.4))',
          }}
        />
      ))}
    </div>
  </div>
</div>

  );
};

export default HeroDashboard;
