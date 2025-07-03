"use client"

import { useState, useEffect } from "react"
import HeroDashboard from "../HeroDashboard"
import { motion, AnimatePresence } from 'framer-motion';
import Popup from "../ui/Popup";
import { PlusCircle, Calendar, Users, MapPin, Sparkles, Clock, CheckCircle, ArrowRight, Trophy, Star } from 'lucide-react';

const HeroSection = () => {


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

   const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Event Coordinator",
            company: "Creative Events Co.",
            content:
                "FunPlanner transformed how we organize events. The intuitive interface and powerful features saved us countless hours.",
            rating: 5,
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            name: "Michael Chen",
            role: "Wedding Planner",
            company: "Dream Weddings",
            content:
                "The best event planning tool I've ever used. My clients love the seamless experience and professional results.",
            rating: 5,
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            name: "Emily Rodriguez",
            role: "Corporate Events Manager",
            company: "TechCorp Inc.",
            content: "FunPlanner's analytics and guest management features are game-changers for corporate event planning.",
            rating: 5,
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            name: "David Thompson",
            role: "Festival Organizer",
            company: "Music Festivals Ltd.",
            content:
                "Managing large-scale events has never been easier. The platform handles everything from ticketing to logistics.",
            rating: 5,
            avatar: "/placeholder.svg?height=60&width=60",
        },
    ]
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [testimonials.length])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
    <div className="relative mt-16 w-fit mx-auto"> {/* <- limits blur overlay area */}
      <div className="relative group z-10 inline-block">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="grid grid-cols-3 gap-y-12 gap-x-16 md:grid-cols-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {visibleLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={`/assets/logos/${logo}`}
                alt={`Client logo ${i}`}
                className="w-24 h-12 object-contain grayscale hover:grayscale-0 transition duration-500 opacity-60 hover:opacity-100"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 0.6, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.2, duration: 1.0, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Only visible when hovering over logo grid */}
        <div className="absolute inset-0 z-40 opacity-0 group-hover:opacity-40 transition duration-100 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <button className="text-black px-6 py-3 text-2xl md:text-base rounded-lg bg-gray-200 hover:bg-gray-100 backdrop-blur-sm shadow-lg border border-white/20 cursor-pointer">
            Meet our customers
          </button>
        </div>
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
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button className="group bg-gradient-to-r from-[#2E3192] to-[] text-white px-8 py-4 rounded-xl font-semibold text-2xl
             hover:from-[#2E3192] hover:to-[] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25
              flex items-center cursor-pointer">
              Get Started Free
              <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.0 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <HeroDashboard />
          </motion.div>
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h4 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4 font-bold">
              Trusted by Event Professionals
              <span className="block text-gray-400 text-xl font-normal mt-2">
                From local gatherings to global conferences
              </span>
            </h4>
            <CustomerLogos />
          </motion.div>

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
          <section id="services" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-50 mb-4">Why Choose FunPlanner?</h2>
                <p className="text-xl text-gray-400">Everything you need to create amazing events</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Calendar,
                    title: "Smart Scheduling",
                    description: "AI-powered scheduling that finds the perfect time for everyone",
                  },
                  {
                    icon: Users,
                    title: "Guest Management",
                    description: "Effortlessly manage RSVPs, dietary requirements, and special requests",
                  },
                  {
                    icon: MapPin,
                    title: "Venue Discovery",
                    description: "Find and book the perfect venue from our curated selection",
                  },
                  {
                    icon: Sparkles,
                    title: "Custom Themes",
                    description: "Beautiful templates and themes for every type of event",
                  },
                  {
                    icon: Clock,
                    title: "Real-time Updates",
                    description: "Keep everyone informed with instant notifications and updates",
                  },
                  {
                    icon: CheckCircle,
                    title: "Task Management",
                    description: "Stay organized with comprehensive task lists and reminders",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/30 border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 rounded-lg p-6 text-center group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-[#2E3192] to-[] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gray-900/30 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
      <p className="text-xl text-gray-400">Join thousands of satisfied event planners</p>
    </div>

    <div className="relative overflow-hidden">
      {/* Gradient overlays for vintage effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>

      <div className="flex animate-scroll">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-96 mx-4 bg-gray-800/40 border border-gray-700 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
                <p className="text-gray-500 text-xs">{testimonial.company}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  )
}

export default HeroSection
