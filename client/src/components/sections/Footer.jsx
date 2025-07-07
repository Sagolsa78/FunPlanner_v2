import {
  Slack,
  Twitter,
  Facebook,
  Instagram,
  LinkedinIcon as LinkedIn,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Templates", href: "#templates" },
      { name: "Integrations", href: "#integrations" },
      { name: "Mobile App", href: "#mobile" },
      { name: "API", href: "#api" },
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Blog", href: "#blog" },
      { name: "Webinars", href: "#webinars" },
      { name: "Case Studies", href: "#cases" },
      { name: "Templates", href: "#templates" },
      { name: "Community", href: "#community" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Partners", href: "#partners" },
      { name: "Contact", href: "#contact" },
      { name: "Security", href: "#security" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
      { name: "Accessibility", href: "#accessibility" },
    ],
  }

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://x.com/low_Key_noob?t=Chyfvl5S2X_2FbZlBDSp3A&s=08", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/omgupta7632?igsh=MWRjMjExMG5kY2h3NA==", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: LinkedIn, href: "https://www.linkedin.com/in/omxdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:text-blue-500" },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#000128] to-[] rounded-3xl p-8 md:p-12 border border-purple-500/20 backdrop-blur-sm">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with Event Planning Tips</h3>
            <p className="text-gray-300 text-lg mb-8">
              Get the latest insights, templates, and industry trends delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-[#2E3192] to-[] text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center group">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <a href="/" className="flex items-center space-x-2">
                <Slack className="w-8 h-8 text-white" />
                <span className="text-white font-bold text-xl">Fun Planner</span>
              </a>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The ultimate event planning platform that combines AI-powered insights with intuitive design. Make every
              event unforgettable with our comprehensive suite of planning tools.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-purple-400" />
                <span>omgupta.tech@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-purple-400" />
                <span>+91 7268823424</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-purple-400" />
                <span>Lucknow, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-3 bg-gray-800 rounded-xl text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700 hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Fun Planner. All rights reserved. Built with ❤️ for event professionals.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🌟 Trusted by 50,000+ event planners</span>
              <span>🔒 SOC 2 Compliant</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
