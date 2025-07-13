"use client";

import React, { useState } from "react";
import { Slack } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const loginHandler = () => navigate("/login");
  const signupHandler = () => navigate("/signup");

  const navLinks = [
    { label: "Product", href: "#product", popup: "product" },
    { label: "Resources", href: "#resources", popup: "resources" },
    { label: "Pricing", href: "#pricing", popup: "pricing" },
    { label: "Customers", href: "#customers", popup: "customers" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const NavigationItem = ({ href, children, popupContent }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleMouseEnter = () => {
      if (popupContent) setIsPopupVisible(true);
    };

    const handleMouseLeave = () => {
      setIsPopupVisible(false);
    };


    const popupData = {
      product: {
        sections: [
          {
            title: "Core Features",
            items: [
              { name: "Plan Events", description: "Create and schedule events with intuitive tools and templates" },
              { name: "Manage Guests", description: "Track RSVPs, send invitations, and manage guest lists with ease" },
            ],
          },
          {
            title: "More",
            items: [
              { name: "Vendor Coordination", description: "Assign vendors and streamline communication in one place" },
              { name: "Budget Tracking", description: "Monitor spending and stay within your event budget" },
              { name: "Task Management", description: "Assign responsibilities and track progress with your team" },
            ],
          },
          {
            title: " ",
            items: [
              { name: "Event Templates", description: "Use pre-built templates for weddings, corporate events, and more" },
              { name: "Mobile Access", description: "Plan and update your events on the go" },
              { name: "AI Suggestions", description: "Get venue, vendor, and decor recommendations powered by AI" },
            ],
          },
        ],
      },
      resources: {
        sections: [
          {
            title: "Guides & Tools",
            items: [
              { name: "Getting Started", description: "Learn how to set up and run your first event" },
              { name: "Event Checklist", description: "Step-by-step planning checklist to keep you on track" },
              { name: "Budget Calculator", description: "Estimate and allocate your event spending" },
            ],
          },
          {
            title: "Community",
            items: [
              { name: "Event Planner Blog", description: "Trends, inspiration, and industry tips" },
              { name: "Planner Forums", description: "Ask questions and share experiences with peers" },
              { name: "Vendor Directory", description: "Browse trusted vendors by category and location" },
            ],
          },
          {
            title: " ",
            items: [
              { name: "Help Center", description: "Support articles and troubleshooting resources" },
              { name: "Templates Library", description: "Ready-to-use planning templates for all event types" },
              { name: "Live Demos", description: "Attend walkthroughs of the platform features" },
            ],
          },
        ],
      },
      pricing: {
        sections: [
          {
            title: "Plans",
            items: [
              { name: "Free", description: "Best for trying out basic features and planning simple events" },
              { name: "Professional", description: "Full suite for freelance planners and small teams" },
              { name: "Agency", description: "Designed for large-scale planners with multiple events" },
            ],
          },
          {
            title: "Billing",
            items: [
              { name: "Cost Estimator", description: "Predict pricing based on event size and features" },
              { name: "Billing Dashboard", description: "Manage invoices, plans, and payment methods" },
              { name: "Payment Options", description: "Credit card, PayPal, and bank transfers supported" },
            ],
          },
          {
            title: " ",
            items: [
              { name: "Add-ons", description: "Enhance your plan with premium features and integrations" },
              { name: "Team Licenses", description: "Special rates for event planning teams" },
              { name: "Contact Sales", description: "Discuss custom pricing and white-label solutions" },
            ],
          },
        ],
      },
      customers: {
        sections: [
          {
            title: "Event Success",
            items: [
              { name: "Case Studies", description: "See how planners achieved success with our platform" },
              { name: "User Testimonials", description: "Hear from real planners and clients" },
              { name: "Spotlight Events", description: "Featured stories from high-profile events" },
            ],
          },
          {
            title: "Support",
            items: [
              { name: "Planner Support", description: "Dedicated assistance for organizers and hosts" },
              { name: "Technical Help", description: "Help with platform issues, available 24/7" },
              { name: "Training", description: "Interactive onboarding for you and your team" },
            ],
          },
          {
            title: " ",
            items: [
              { name: "User Groups", description: "Connect with fellow planners through local meetups" },
              { name: "Webinars & Events", description: "Learn and network at live digital and in-person events" },
              { name: "Partner Program", description: "Join our network of event pros and vendors" },
            ],
          },
        ],
      },
    };


    const NavigationPopup = ({ isVisible, content, onMouseEnter, onMouseLeave }) => {
      if (!isVisible || !content) return null;

      return (
        <div
          className="absolute top-full left-0 mt-2 w-screen max-w-[720px] bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl z-50 p-6"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.title && (
                  <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="text-white text-sm font-medium">{item.name}</h4>
                      <p className="text-gray-400 text-xs">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };


    return (
      <div
        className="relative hidden md:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={href}
          className="text-[#8a8f98] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
        >
          {children}
        </a>
        {popupContent && isPopupVisible && (
          <NavigationPopup
            isVisible={isPopupVisible}
            content={popupData[popupContent]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    );
  };

  return (
    <nav className="w-full bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <Slack className="w-7 h-7 text-white" />
            <span className="text-white font-medium text-lg">Fun Planner</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavigationItem
                key={link.label}
                href={link.href}
                popupContent={link.popup}
              >
                {link.label}
              </NavigationItem>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className=" hidden md:flex items-center space-x-4">
            <button
              onClick={loginHandler}
              className="text-gray-300 hover:cursor-pointer hover:text-white px-3 py-1.5 text-sm font-medium"
            >
              Login
            </button>
            <button
              onClick={signupHandler}
              className="bg-gray-300 hover:cursor-pointer text-gray-900 hover:bg-gray-100 px-4 py-1.5 text-sm font-medium rounded-lg transition"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 pt-2 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="hover:cursor-pointer border-t border-gray-800 pt-4">
              <button
                onClick={() => {
                  loginHandler();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full hover:cursor-pointer text-left text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
              >
                Login
              </button>
              <button
                onClick={() => {
                  signupHandler();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full hover:cursor-pointer text-left bg-white text-black hover:bg-gray-100 px-3 py-2 mt-2 text-base font-medium rounded-md"
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
