"use client"

import { useState } from "react"
import CreateVendor from "../pop-ups/CreateVendor"
import { useEffect } from "react"
import axios from "axios"
import {
  Users, CheckCircle, Clock, Flag, Search, Eye, Edit, Ban, Plus, X, Star, Phone, Mail, File, Upload, ChevronDown
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom"
export const Icons = {
  Users, CheckCircle, Clock, Flag, Search, Eye, Edit, Ban, Plus, X, Star, Phone, Mail, File, Upload, ChevronDown,
};


export default function VendorsDashboard() {

  const [selectedVendor, setSelectedVendor] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddVendor, setShowAddVendor] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [stats, setStats] = useState([]);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  // const vendors = [
  //   {
  //     id: 3,
  //     name: "Bloom Floral Design",
  //     category: "Decoration",
  //     contact: "Emma Davis",
  //     email: "emma@bloomfloral.com",
  //     phone: "+1 (555) 456-7890",
  //     status: "active",
  //     rating: 4.9,
  //     services: ["Floral Arrangements", "Event Decoration", "Wedding Decor"],
  //     recentEvents: ["Spring Wedding", "Corporate Event"],
  //     documents: [{ name: "Portfolio.pdf", type: "PDF", size: "5.1 MB", date: "2024-01-20" }],
  //   },
  // ]

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

  // stats

  //get all vendors
  useEffect(() => {
    const filteredVendors = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');
      try {
        const response = await axios.get('http://localhost:5000/api/vendors/get-all-vendors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVendors(response.data || []);
        console.log(response.data)
      } catch (error) {
        console.error("Failed to load clients", error);
      }
    };

    filteredVendors();
  }, []);

  //stats
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');

      try {
        const res = await axios.get('http://localhost:5000/api/vendors/get-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setStats([
          { title: "Total Vendors", value: data.totalVendors, icon: Icons.Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Active Vendors", value: data.activeVendors, icon: Icons.CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "Pending Vendors", value: data.pendingVendors, icon: Icons.Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { title: "Flagged Vendors", value: data.flaggedVendors, icon: Icons.Flag, color: "text-red-400", bg: "bg-red-400/10" },
        ]);
      } catch (error) {
        console.error('Error fetching vendor stats:', error);
      }
    }
    fetchStats();
  }, []);

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
            onClick={() => setIsPopupOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
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
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
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
                        className={`p-2 rounded-lg ${comm.type === "email"
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
                          className={`px-2 py-1 rounded-full text-xs font-medium ${note.tag === "High Priority"
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
            vendors.map((vendor) => (
              <div className="bg-slate-800 rounded-lg border border-slate-700 h-fit">
              <div className="p-6 border-b border-slate-700">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-white">Vendor Details</h2>
                  <div className="flex items-center space-x-2">
                    <Link
                    key={vendor.id}
                    to ={`/vendor-profile/${vendor.id}`}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye/>
                  </Link>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                  >
                    <Icons.X />
                  </button>
                  </div>
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
            ))
          )}
        </div>
      </div>
      <CreateVendor isOpen={isPopupOpen} onClose={() => { setIsPopupOpen(false) }} />
    </div>
  )
}
