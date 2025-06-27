"use client"

import { useState } from "react"

// Icons as SVG components (since we can't use external icon libraries)
const Icons = {
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Flag: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6h-8.5l-1-2H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  Ban: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  File: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Upload: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
}

export default function VendorsDashboard() {
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddVendor, setShowAddVendor] = useState(false)

  // Sample data
  const stats = [
    { title: "Total Vendors", value: "156", icon: Icons.Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Active Vendors", value: "142", icon: Icons.CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Pending Approvals", value: "8", icon: Icons.Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { title: "Flagged Vendors", value: "6", icon: Icons.Flag, color: "text-red-400", bg: "bg-red-400/10" },
  ]

  const vendors = [
    {
      id: 1,
      name: "Elite Catering Co.",
      category: "Catering",
      contact: "Sarah Johnson",
      email: "sarah@elitecatering.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      rating: 4.8,
      services: ["Corporate Catering", "Wedding Catering", "Event Planning"],
      recentEvents: ["Tech Conference 2024", "Annual Gala"],
      documents: [
        { name: "License.pdf", type: "PDF", size: "2.4 MB", date: "2024-01-15" },
        { name: "Insurance.pdf", type: "PDF", size: "1.8 MB", date: "2024-01-10" },
      ],
    },
    {
      id: 2,
      name: "Sound & Vision AV",
      category: "Audio/Visual",
      contact: "Mike Chen",
      email: "mike@soundvision.com",
      phone: "+1 (555) 987-6543",
      status: "pending",
      rating: 4.5,
      services: ["Sound Systems", "Lighting", "Video Production"],
      recentEvents: ["Product Launch", "Conference 2023"],
      documents: [{ name: "Equipment_List.pdf", type: "PDF", size: "3.2 MB", date: "2024-02-01" }],
    },
    {
      id: 3,
      name: "Bloom Floral Design",
      category: "Decoration",
      contact: "Emma Davis",
      email: "emma@bloomfloral.com",
      phone: "+1 (555) 456-7890",
      status: "active",
      rating: 4.9,
      services: ["Floral Arrangements", "Event Decoration", "Wedding Decor"],
      recentEvents: ["Spring Wedding", "Corporate Event"],
      documents: [{ name: "Portfolio.pdf", type: "PDF", size: "5.1 MB", date: "2024-01-20" }],
    },
  ]

  const communications = [
    {
      id: 1,
      type: "email",
      subject: "Contract Renewal Discussion",
      timestamp: "2 hours ago",
      vendor: "Elite Catering Co.",
    },
    {
      id: 2,
      type: "call",
      subject: "Equipment Setup Meeting",
      timestamp: "1 day ago",
      vendor: "Sound & Vision AV",
    },
    {
      id: 3,
      type: "message",
      subject: "Quote Request Follow-up",
      timestamp: "3 days ago",
      vendor: "Bloom Floral Design",
    },
  ]

  const internalNotes = [
    {
      id: 1,
      content: "Excellent service quality. Recommended for high-profile events.",
      timestamp: "2024-02-28",
      tag: "High Priority",
      author: "John Doe",
    },
    {
      id: 2,
      content: "Need to follow up on insurance documentation.",
      timestamp: "2024-02-25",
      tag: "Follow-up",
      author: "Jane Smith",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "blocked":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icons.Star key={i} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Icons.Star key="half" className="text-yellow-400 opacity-50" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icons.Star key={`empty-${i}`} className="text-gray-600" />)
    }

    return stars
  }

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || vendor.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesTab = activeTab === "all" || vendor.status === activeTab

    return matchesSearch && matchesCategory && matchesTab
  })

  return (
    <div className="min-h-screen bg-[#161b22] text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">Vendors Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your vendor relationships</p>
          </div>
          <button
            onClick={() => setShowAddVendor(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Icons.Plus />
            <span>Add Vendor</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Vendor Overview Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className={`${selectedVendor ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}>
            {/* Vendor List Table */}
            <div className="bg-slate-800 rounded-lg border border-slate-700">
              <div className="p-6 border-b border-slate-700">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  <h2 className="text-xl font-semibold text-white">Vendor List</h2>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search vendors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-8"
                      >
                        <option value="all">All Categories</option>
                        <option value="catering">Catering</option>
                        <option value="audio/visual">Audio/Visual</option>
                        <option value="decoration">Decoration</option>
                      </select>
                      <Icons.ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Status Tabs */}
                <div className="flex space-x-1 mt-4">
                  {["all", "active", "pending", "blocked"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-purple-600 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="text-left py-3 px-6 text-slate-300 font-medium">Vendor Name</th>
                      <th className="text-left py-3 px-6 text-slate-300 font-medium">Category</th>
                      <th className="text-left py-3 px-6 text-slate-300 font-medium">Contact</th>
                      <th className="text-left py-3 px-6 text-slate-300 font-medium">Status</th>
                      <th className="text-left py-3 px-6 text-slate-300 font-medium">Rating</th>
                      <th className="text-left py-3 px-6 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-white">{vendor.name}</p>
                            <p className="text-sm text-slate-400">{vendor.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-300">{vendor.category}</td>
                        <td className="py-4 px-6 text-slate-300">{vendor.contact}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(vendor.status)}`}
                          >
                            {vendor.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1">
                            {renderStars(vendor.rating)}
                            <span className="text-sm text-slate-400 ml-2">{vendor.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedVendor(vendor)}
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
                            >
                              <Icons.Eye />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                              <Icons.Edit />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-lg transition-colors">
                              <Icons.Ban />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Communication Log */}
            <div className="bg-slate-800 rounded-lg border border-slate-700">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">Communication Log</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {communications.map((comm) => (
                    <div key={comm.id} className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg">
                      <div
                        className={`p-2 rounded-lg ${
                          comm.type === "email"
                            ? "bg-blue-500/20"
                            : comm.type === "call"
                              ? "bg-green-500/20"
                              : "bg-purple-500/20"
                        }`}
                      >
                        {comm.type === "email" ? (
                          <Icons.Mail className="text-blue-400" />
                        ) : comm.type === "call" ? (
                          <Icons.Phone className="text-green-400" />
                        ) : (
                          <Icons.Mail className="text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{comm.subject}</p>
                        <p className="text-sm text-slate-400">
                          {comm.vendor} • {comm.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Internal Notes Panel */}
            <div className="bg-slate-800 rounded-lg border border-slate-700">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">Internal Notes</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {internalNotes.map((note) => (
                    <div key={note.id} className="p-4 bg-slate-700 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            note.tag === "High Priority"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {note.tag}
                        </span>
                        <span className="text-xs text-slate-400">{note.timestamp}</span>
                      </div>
                      <p className="text-slate-300 mb-2">{note.content}</p>
                      <p className="text-xs text-slate-500">by {note.author}</p>
                    </div>
                  ))}
                </div>

                {/* Add Note */}
                <div className="space-y-3">
                  <textarea
                    placeholder="Add internal note..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows="3"
                  />
                  <div className="flex justify-between items-center">
                    <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Follow-up</option>
                      <option>High Priority</option>
                      <option>General</option>
                    </select>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Details Sidebar */}
          {selectedVendor && (
            <div className="bg-slate-800 rounded-lg border border-slate-700 h-fit">
              <div className="p-6 border-b border-slate-700">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-white">Vendor Details</h2>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <Icons.X />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-white mb-3">{selectedVendor.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-300">Contact: {selectedVendor.contact}</p>
                    <p className="text-slate-300">Email: {selectedVendor.email}</p>
                    <p className="text-slate-300">Phone: {selectedVendor.phone}</p>
                    <p className="text-slate-300">Category: {selectedVendor.category}</p>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-medium text-white mb-2">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Events */}
                <div>
                  <h4 className="font-medium text-white mb-2">Recent Events</h4>
                  <div className="space-y-2">
                    {selectedVendor.recentEvents.map((event, index) => (
                      <div key={index} className="p-2 bg-slate-700 rounded text-sm text-slate-300">
                        {event}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-white mb-2">Rating & Feedback</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">{renderStars(selectedVendor.rating)}</div>
                    <span className="text-slate-300">{selectedVendor.rating}/5.0</span>
                  </div>
                </div>

                {/* File Manager */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-white">Documents</h4>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors">
                      <Icons.Upload className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedVendor.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icons.File className="text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-white">{doc.name}</p>
                            <p className="text-xs text-slate-400">
                              {doc.size} • {doc.date}
                            </p>
                          </div>
                        </div>
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <Icons.Eye />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Upload Area */}
                  <div className="mt-4 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <Icons.Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Drag & drop files here or click to browse</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Vendor Modal */}
      {showAddVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Add New Vendor</h2>
                <button
                  onClick={() => setShowAddVendor(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Icons.X />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Vendor Name</label>
                  <input
                    type="text"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter vendor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Select category</option>
                    <option>Catering</option>
                    <option>Audio/Visual</option>
                    <option>Decoration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Contact Person</label>
                  <input
                    type="text"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Contact person name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="vendor@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Blocked</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Services Offered</label>
                <textarea
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="3"
                  placeholder="Describe services offered..."
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowAddVendor(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Add Vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
