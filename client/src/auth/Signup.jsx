"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Slack } from "lucide-react"
import axios from 'axios'
import { toast } from "react-toastify"

const Signup = () => {
    const navigate = useNavigate();
    const [Loading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        agreeToTerms: false,
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const apicall = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                // alert("User created successfully")
                toast.success("User Created Successfully")
                navigate('/login')
                setFormData({
                    fullname: '',
                    lastname: '',
                    email: '',
                    password: ''
                })

            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred "+error.message);


        }
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            toast.error("please tick the checkbox")
            return;

        }
        setIsLoading(true);
        apicall();
        setIsLoading(false)

    }
    const googleSignupHandler = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    }

    return (
        <div className="min-h-screen bg-[#0b0b0f] text-gray-100">
            {/* Header */}
            <header className="w-full bg-[#0d0d10] border-b border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-2 sm:px-6 lg:px-8 py-2">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 hover:cursor-pointer hover:opacity-90 transition-opacity duration-200" onClick={()=>{
                        navigate("/")
                    }}>
                        <Slack className="w-7 h-7 text-purple-500" />
                        <span className="text-white text-xl font-semibold tracking-tight" >Fun Planner</span>
                    </div>

                    {/* CTA for login */}
                    <div className="mt-4 sm:mt-0 flex items-center space-x-3 text-sm sm:text-base">
                        <span className="text-gray-400  font-sans-serif whitespace-nowrap">Already have an account?</span>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-gradient-to-tr hover:cursor-pointer from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow hover:shadow-lg"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>


            {/* Main Content */}
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)]">


                {/* Right Side - Signup Form */}
                <div className="w-full lg:w-1/2 bg-[#1a1b1e] px-8 py-8  flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Sign up</h2>

                        {/* Social Login Buttons */}
                        <div className="space-y-3 mb-6">

                            <button className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                onClick={googleSignupHandler}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center mb-6">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-4 text-gray-500 text-sm">or</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Signup Form */}
                        <form className="space-y-4" onSubmit={signupHandler} method="POST">
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        className="w-full px-3 py-2 bg-[#2b2c30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        className="w-full px-3 py-2 bg-[#2b2c30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="w-full px-3 py-2 bg-[#2b2c30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter password"
                                        className="w-full px-3 py-2 bg-[#2b2c30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showPassword ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                />
                                            ) : (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Terms and Conditions Checkbox */}
                            <div className="flex items-start space-x-3 mt-6">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="mt-1 w-4 h-4 hover:cursor-pointer text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                                    I have read and agree to PixelBin's{" "}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 underline">
                                        Privacy Policy
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 underline">
                                        Terms of Use
                                    </a>
                                </label>
                            </div>

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                disabled={Loading}
                                className={`w-full py-2 px-4 border hover:cursor-pointer border-transparent rounded-md shadow-sm text-sm font-medium text-white ${Loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                                    } `}

                            >
                                {Loading ? "Signing Up..." : "Sign Up"}

                            </button>
                        </form>
                    </div>
                </div>


                {/* Left Side - Features */}
                <div className="flex-1 px-10 py-16 lg:px-16 max-w-3xl">
                    <h1 className="text-4xl font-bold text-white mb-12 leading-tight">
                        Plan, Organize & Host <br /> Unforgettable Events
                    </h1>

                    <div className="space-y-10">
                        {[
                            {
                                title: "Smart Scheduling & Reminders",
                                desc: "Automate event scheduling, send timely reminders to guests, and avoid last-minute surprises with our intuitive calendar system.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10m-11 4h12m-5 4h5a2 2 0 002-2V7a2 2 0 00-2-2h-1"
                                    />
                                ),
                            },
                            {
                                title: "Vendor & Guest Management",
                                desc: "Easily track RSVPs, assign tasks to vendors, and manage guest lists in one central dashboard to ensure smooth coordination.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m1-4a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z"
                                    />
                                ),
                            },
                            {
                                title: "Real-Time Collaboration Tools",
                                desc: "Work with your team, clients, or co-hosts in real-time. Share notes, chat, and update event progress without switching platforms.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                ),
                            },
                        ].map(({ title, desc, icon }, idx) => (
                            <div key={idx} className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {icon}
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Signup
