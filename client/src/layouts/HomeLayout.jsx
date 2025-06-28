
// import HeroSection from "../components/sections/HeroSection";
// import Navbar from "../components/sections/Navbar";

// const HomeLayout = () => {
//     return(
//         <div>
//             <Navbar/>
//             <HeroSection/>
//         </div>
//     )
// }

// export default HomeLayout;




import { useState, useEffect } from "react"
import React from "react"
import { Button } from "../components/ui/button2"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion";


import { Sparkles, MapPin, Calendar, Users, Star, ArrowRight, PartyPopper, Clock, CheckCircle, Github, Twitter, Linkedin, X, Mail, Slack } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function FunPlannerLanding() {
    const navigate = useNavigate();



    const [selectedEvent, setSelectedEvent] = useState(null);

    //AuthHandler
    const Loginhandler = async () => {
        try {
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    const SignupHandler = async function () {
        try {
            navigate("/signup")
        }
        catch (error) {
            console.error(error);

        }
    }

    // Sample events data
    const sampleEvents = [
        {
            id: 1,
            title: "Summer Music Festival",
            type: "Entertainment",
            location: "Central Park, NYC",
            date: "July 15, 2024",
            attendees: 500,
            image: "/imge3.webp",
            price: "$45",
        },
        {
            id: 2,
            title: "Tech Innovation Summit",
            type: "Business",
            location: "Silicon Valley",
            date: "August 20, 2024",
            attendees: 200,
            image: "/hotelImg_1.jpg",
            price: "$120",
        },
        {
            id: 3,
            title: "Wedding Celebration",
            type: "Personal",
            location: "Garden Venue",
            date: "September 5, 2024",
            attendees: 150,
            image: "/OutdoorIMG2.webp",
            price: "$200",
        },
    ]

    // Event locations
    const eventLocations = [
        {
            name: "Central Park",
            city: "New York",
            capacity: "5000+",
            events: 45,
            image: "/centralpark.jpg",
        },
        {
            name: "Convention Center",
            city: "Los Angeles",
            capacity: "2000+",
            events: 32,
            image: "/images.jpeg",
        },
        {
            name: "Beach Resort",
            city: "Miami",
            capacity: "1000+",
            events: 28,
            image: "/images (1).jpeg",
        },
        {
            name: "Mountain Lodge",
            city: "Colorado",
            capacity: "500+",
            events: 15,
            image: "/welcom.jpg",
        },
    ]

    // Testimonials
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

    // Testimonial carousel animation
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Grid Pattern Background */}
            <div
                className="fixed inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Navigation */}
            <nav className="relative z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}

                        <div className="flex items-center mr-36">
                            <a href="/" className="flex items-center space-x-2">
                                <Slack className="w-8 h-8 text-white" />
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl bg-clip-text text-transparent font-medium font-sans text-2xl ">Fun Planner</span></a>
                        </div>
                        {/* <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <PartyPopper className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FunPlanner
              </span>
            </div> */}


                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-white hover:text-purple-400 transition-colors duration-200 font-medium">
                                Home
                            </a>
                            <a
                                href="#services"
                                className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium"
                            >
                                Services
                            </a>
                            <a
                                href="#about"
                                className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium"
                            >
                                About
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">

                            <Button

                                variant="ghost"
                                onClick={Loginhandler}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                            >
                                Login
                            </Button>


                            <Button
                                onClick={SignupHandler}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
                                Sign Up
                            </Button>

                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-6">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                            ✨ Trusted by 10,000+ Event Organizers
                        </Badge>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Plan Unforgettable
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Events with Ease
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Transform your event planning experience with our powerful platform. From intimate gatherings to large-scale
                        festivals, FunPlanner makes every celebration memorable and stress-free.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Button
                            onClick={SignupHandler} className="bg-gradient-to-r hover:cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                            Start Planning Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-lg text-lg font-medium"
                        >
                            Watch Demo
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
                            <div className="text-gray-400">Events Created</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-400 mb-2">50K+</div>
                            <div className="text-gray-400">Happy Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">99%</div>
                            <div className="text-gray-400">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                            <div className="text-gray-400">Support</div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Featured Events Section */}
            <section className=" relative py-20 px-6 bg-gray-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
                        <p className="text-xl text-gray-400">Discover amazing events happening near you</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sampleEvents.map((event) => (
                            <Card key={event.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-purple-500/90 text-white">{event.price}</Badge>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="outline" className="border-gray-600 text-gray-300">{event.type}</Badge>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                                        <div className="space-y-2 text-gray-400">
                                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span className="text-sm">{event.location}</span></div>
                                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span className="text-sm">{event.date}</span></div>
                                            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span className="text-sm">{event.attendees} attendees</span></div>
                                        </div>
                                        <Button onClick={() => {
                                            console.log("Button clicked for:", event);
                                            setSelectedEvent(event);
                                        }} className="w-full mt-4 hover:cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">View Details</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Popup Modal */}
                {selectedEvent && (
                    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)}>
                        <motion.div className="bg-gray-900 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                            <button className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition" onClick={() => setSelectedEvent(null)}>
                                <X className="h-5 w-5" />
                            </button>
                            <div className="p-6">
                                <img src={selectedEvent.image || "/placeholder.svg"} alt={selectedEvent.title} className="rounded-lg mb-6 w-full" />
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                                <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
                                <ul className="text-gray-400 list-disc list-inside space-y-2">
                                    <li>Type: {selectedEvent.type}</li>
                                    <li>Location: {selectedEvent.location}</li>
                                    <li>Date: {selectedEvent.date}</li>
                                    <li>Price: {selectedEvent.price}</li>
                                    <li>Attendees: {selectedEvent.attendees}</li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </section>


            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-gray-900/30 overflow-hidden">
                <div className="max-w-7xl mx-auto ">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
                        <p className="text-xl text-gray-400">Join thousands of satisfied event planners</p>
                    </div>

                    <div className="relative overflow-hidden">
                        {/* Gradient overlays for vintage effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>

                        <div className="flex animate-scroll">
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <Card key={index} className="flex-shrink-0 w-96 mx-4 bg-gray-800/40 border-gray-700 backdrop-blur-sm">
                                    <CardContent className="p-6">
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
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="services" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose FunPlanner?</h2>
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
                            <Card
                                key={index}
                                className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Next Event?</h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Join thousands of event planners who trust FunPlanner to create unforgettable experiences.
                    </p>
                    <Button
                        className="bg-gradient-to-r  from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600  hover:cursor-pointer text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                        onClick={SignupHandler}>
                        Get Started for free
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <PartyPopper className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    FunPlanner
                                </span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Making event planning fun, easy, and memorable. Create extraordinary experiences with our powerful
                                platform.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Developer Info */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Developer</h3>
                            <div className="text-gray-400 space-y-2">
                                <p className="font-medium text-white">Mohit Sahani</p>
                                <p>Full Stack Developer</p>
                                <p>Passionate about creating amazing user experiences</p>
                                <a
                                    href="mailto:mohitsahani@sagolsa.com"
                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    mohitsahani@sagolsa.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FunPlanner. All rights reserved. Built with ❤️ by Mohit Sahani</p>
                    </div>
                </div>
            </footer>

            {/* CSS for animations */}
            <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
        </div>
    )
}
