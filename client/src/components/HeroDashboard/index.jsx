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
  <div className="relative w-full h-[620px] bg-gray-950 overflow-hidden flex justify-center items-center">
  <div className="animated border-wrapper ">
    <div
      className="relative origin-top-left"
      style={{ width: 1100, height: 679, transform: 'scale(0.8)' }}
    >
      {parts.map((part, index) => (
        <motion.img
          key={part}
          src={`/assets/dashboard-slices/${part}`}
          alt={`dashboard-part-${index}`}
          {...dashboardSlices[index]}
         className="shadow-lg"
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
// import dashboardSlices from './animations';

// const parts = [
//   'sidebar.png',
//   'topbar.png',
//   'HeroSection1.png',
//   'HeroSection2.1.png',
//   'HeroSection2.2.png',
//   'HeroSection2.3.png',
//   'HeroSection2.4.png',
//   'HeroSection2.5.png',
//   'HeroSection3.1.png',
//   'HeroSection3.2.png',
//   'HeroSection4.png',
// ];

// const HeroDashboard = () => {
//   return (
//     <div className="w-full flex justify-center items-center bg-gray-950 py-12">
//       {/* Fixed-size animation stage */}
//       <div className="relative" style={{ width: 1280, height: 700 }}>
//         {parts.map((part, index) => (
//           <motion.img
//             key={part}
//             src={`/assets/dashboard-slices/${part}`}
//             alt={`dashboard-part-${index}`}
//             {...dashboardSlices[index]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroDashboard;

