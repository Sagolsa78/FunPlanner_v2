"use client"
import { X, Calendar, Users, Sparkles, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Scheduling",
      description: "AI-powered scheduling that finds the perfect time for everyone",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Guest Management",
      description: "Effortlessly manage RSVPs, dietary preferences, and seating arrangements",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Vendor Coordination",
      description: "Connect with trusted vendors and manage all communications in one place",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Discover FunPlanner Features</h2>
              <p className="text-gray-300 text-lg">
                Everything you need to plan, manage, and execute unforgettable events
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center group">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Popup
