"use client"

import { useState, useEffect } from "react"
import HeroDashboard from "../HeroDashboard"
import { motion, AnimatePresence } from 'framer-motion';
import Popup from "../ui/Popup";
import { PlusCircle } from 'lucide-react';

const HeroSection = () => {


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const logos = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    'logo4.png',
    'logo5.png',
    'logo6.png',
    'logo1.png',
    'logo2.png',
    'logo3.png',
    'logo4.png',
    'logo5.png',
    'logo6.png',
  ];

  const CustomerLogos = () => {
    const [index, setIndex] = useState(0);
    const visibleLogos = logos.slice(index, index + 6);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 6) % logos.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative mt-12 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="grid grid-cols-3 gap-y-20 gap-x-28 md:grid-cols-3 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {visibleLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={`/assets/logos/${logo}`}
                alt={`Client logo ${i}`}
                className="w-32 h-16 object-contain grayscale hover:grayscale-0 transition duration-500"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 1.0, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Background blur and hover button */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-md flex items-center justify-center rounded-lg">
          <button className="text-white px-5 py-2 text-sm md:text-base rounded  bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-md">
            Meet our customers
          </button>
        </div>
      </div>
    );
  };

  const cardData = [
    {
      id: 1,
      image: 'HeroSection3.2.png',
      statement: 'Seamlessly manage large-scale conferences and corporate events.',
    },
    {
      id: 2,
      image: 'HeroSection2.5.png',
      statement: 'Organize stunning weddings and private celebrations with ease.',
    },
    {
      id: 3,
      image: 'HeroSection3.2.png',
      statement: 'Coordinate vibrant festivals and public gatherings efficiently.',
    },
  ];

  const Card = ({ imageSrc, statement, onIconClick }) => {
    return (
      <div className="relative bg-[#141516] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-full max-w-sm mx-auto">
        {/* Image with dilution effect */}
        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-xl">
          <img
            src={imageSrc}
            alt="Card Visual"
            className="w-full h-full object-cover filter brightness-[2.2]" // Darken the image
            style={{ opacity: 0.7 }} // Allow dark background to show through for blending
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/333333/FFFFFF?text=Image+Placeholder'; }}
          />
          {/* Optional: Add a subtle gradient overlay for more blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141516] to-transparent opacity-50"></div>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between items-center text-center">
          {/* Statement */}
          <p className="text-white text-lg font-medium leading-relaxed mb-6">
            {statement}
          </p>

          {/* Encircled Plus Icon */}
          <button
            onClick={onIconClick}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-purple-500 text-purple-400 hover:text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#141516]"
            aria-label="Open details"
          >
            <PlusCircle size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Animated Lines */}
            <g className="animate-pulse">
              <path
                d="M0,400 Q300,200 600,400 T1200,400"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                fill="none"
                style={{
                  transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                }}
              />
              <path
                d="M0,300 Q400,100 800,300 T1200,300"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                fill="none"
                style={{
                  transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.05}px)`,
                }}
              />
            </g>

            {/* Geometric Shapes */}
            <circle
              cx="200"
              cy="200"
              r="2"
              fill="rgba(255,255,255,0.3)"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              }}
            />
            <circle
              cx="800"
              cy="300"
              r="1.5"
              fill="rgba(255,255,255,0.2)"
              style={{
                transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.03}px)`,
              }}
            />
            <circle
              cx="1000"
              cy="150"
              r="1"
              fill="rgba(255,255,255,0.4)"
              style={{
                transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * -0.02}px)`,
              }}
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Main Heading */}
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl md:text-7xl lg:text-5xl  text-white mb-4 leading-tight">
              Plan Unforgettable
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Events with Ease.
              </span>
            </h1>
            <p className="text-xl md:text-xl text-gray-300 mb-0.5 max-w-3xl mx-auto leading-relaxed">
              Meet the new standard for modern software development. Streamline issues, sprints, and product roadmaps.
            </p>
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="bg-white text-black px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Get started
            </button>
            <button className=" text-white  rounded-md font-medium text-lg transition-all duration-200">
              Watch demo
            </button>
          </div>

          <div className="mb-8" >
            <HeroDashboard />
          </div>
          <div>

            <div className="mb-16">
              <h4 className="text-xl md:text-xl lg:text-2xl text-white mt-8 mb-8 leading-tight">
                Powering event management businesses.
                <span className="block text-gray-400 text-2xl">
                  From local gatherings to global conferences.
                </span>
              </h4 >

              <div className="mb-12 mt-4">
                <CustomerLogos />
              </div>
            </div>
          </div>

          <div className="mt-20 mb-24 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
            <h4 className="text-white text-3xl md:text-5xl font-bold mb-12 md:mb-0 md:mr-12 lg:mr-24 w-full md:w-2/5 lg:w-1/2">
              Made for Event <span className="block">Management teams</span>
            </h4>
            <h6 className="text-white text-xl leading-snug w-full md:w-3/5 lg:w-1/2">
              Your events are elevated by the practices and principles that distinguish elite planners from the rest:
              innovative vision, effortless logistics.
            </h6>
          </div>


          {/* Main Container for Cards */}
          <div className="container mb-28 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {cardData.map((card, index) => (
              <Card
                key={card.id}
                imageSrc={`/assets/dashboard-slices/${card.image}`}
                statement={card.statement}
                onIconClick={handleOpenPopup}
              />
            ))}
          </div>

          {/* Render the Popup component */}
          <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />


          {/* Stats or Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-200">
                10,000+
              </div>
              <div className="text-gray-400">Teams</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-200">
                99.9%
              </div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                10ms
              </div>
              <div className="text-gray-400">Response time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  )
}

export default HeroSection
