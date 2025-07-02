"use client"

import React from "react";
import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  StarOff,
  Mail,
  Phone,
  User,
  Tag,
  Calendar,
  FileText,
  Image as ImageIcon,
  Download,
  ChevronRight,
  Building,
  MapPin,
  Clock,
} from 'lucide-react';

const Icons = {
  ArrowLeft: () => <ArrowLeft className="w-5 h-5 " />,
  Star: () => <Star className="w-4 h-4 fill-current text-gray-400" />,
  StarOutline: () => <StarOff className="w-4 h-4" />,
  Mail: () => <Mail className="w-5 h-4 text-gray-400" />,
  Phone: () => <Phone className="w-5 h-4 text-gray-400" />,
  User: () => <User className="w-5 h-4 text-gray-400" />,
  Tag: () => <Tag className="w-5 h-5 text-gray-400" />,
  Calendar: () => <Calendar className="w-5 h-5 text-gray-400" />,
  FileText: () => <FileText className="w-5 h-5 text-gray-400" />,
  Image: () => <ImageIcon className="w-5 h-5" />,
  Download: () => <Download className="w-4 h-4" />,
  ChevronRight: () => <ChevronRight className="w-4 h-4" />,
  Building: () => <Building className="w-5 h-5" />,
  MapPin: () => <MapPin className="w-5 h-5" />,
  Clock: () => <Clock className="w-4 h-4" />,
};

export default function VendorProfile() {

    const navigate = useNavigate()
    const [vendor, setVendor] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

  // Sample vendor data - in a real app, this would come from props or API
//   const vendor = {
//     id: vendorId || 1,
//     name: "Elite Catering Solutions",
//     email: "contact@elitecatering.com",
//     phone: "+1 (555) 123-4567",
//     contactPerson: "Sarah Johnson",
//     category: "Catering",
//     status: "active",
//     rating: 4.8,
//     totalReviews: 127,
//     location: "New York, NY",
//     website: "www.elitecatering.com",
//     joinDate: "January 2022",
//     description:
//       "Elite Catering Solutions has been providing exceptional catering services for corporate events, weddings, and special occasions for over 10 years. We pride ourselves on using fresh, locally-sourced ingredients and creating memorable dining experiences.",
//     services: [
//       "Corporate Event Catering",
//       "Wedding Catering",
//       "Cocktail Reception Services",
//       "Buffet Setup & Service",
//       "Custom Menu Planning",
//       "Dietary Accommodation",
//       "Event Staff Coordination",
//       "Equipment Rental",
//     ],
//     recentEvents: [
//       {
//         id: 1,
//         name: "Annual Tech Conference 2024",
//         date: "2024-02-15",
//         type: "Corporate",
//         attendees: 250,
//         status: "completed",
//       },
//       {
//         id: 2,
//         name: "Johnson Wedding Reception",
//         date: "2024-01-28",
//         type: "Wedding",
//         attendees: 120,
//         status: "completed",
//       },
//       {
//         id: 3,
//         name: "Product Launch Event",
//         date: "2024-03-10",
//         type: "Corporate",
//         attendees: 80,
//         status: "upcoming",
//       },
//       {
//         id: 4,
//         name: "Charity Gala Dinner",
//         date: "2024-02-05",
//         type: "Nonprofit",
//         attendees: 200,
//         status: "completed",
//       },
//     ],
//     documents: [
//       {
//         id: 1,
//         name: "Business License 2024.pdf",
//         type: "pdf",
//         size: "2.4 MB",
//         uploadDate: "2024-01-15",
//         category: "Legal",
//       },
//       {
//         id: 2,
//         name: "Insurance Certificate.pdf",
//         type: "pdf",
//         size: "1.8 MB",
//         uploadDate: "2024-01-10",
//         category: "Insurance",
//       },
//       {
//         id: 3,
//         name: "Menu Portfolio.pdf",
//         type: "pdf",
//         size: "5.2 MB",
//         uploadDate: "2024-02-01",
//         category: "Portfolio",
//       },
//       {
//         id: 4,
//         name: "Event Photos.zip",
//         type: "zip",
//         size: "15.7 MB",
//         uploadDate: "2024-02-20",
//         category: "Media",
//       },
//       {
//         id: 5,
//         name: "Contract Template.docx",
//         type: "docx",
//         size: "0.8 MB",
//         uploadDate: "2024-01-20",
//         category: "Contract",
//       },
//     ],
//   }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get event status color
  const getEventStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
      case "doc":
      case "docx":
        return <Icons.FileText className="text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <Icons.Image className="text-blue-500" />
      case "zip":
      case "rar":
        return <Icons.Download className="text-purple-500" />
      default:
        return <Icons.FileText className="text-gray-500" />
    }
  }

  // Render star rating
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
      stars.push(<Icons.StarOutline key={`empty-${i}`} className="text-gray-300" />)
    }

    return stars
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Generate initials for avatar
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
          const fetchVendor = async () => {
              const token = localStorage.getItem("token");
              if (!token) return console.error("No token found");
  
              try {
                  const res = await axios.get(`http://localhost:5000/api/vendors/vendor-stats/${id}`, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  });
                  setVendor(res.data);
                //   setLoading(false);
              } catch (err) {
                  console.error("Failed to load Vendor", err);
                  setLoading(false);
              }
          };
  
          fetchVendor();
      }, [id]);

  return (
    <div className="min-h-screen bg-[#161b22]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-slate-800 border-b border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Icons.ArrowLeft />
                <span className="hidden text-sm sm:inline text-slate-400">Back to Vendors Dashboard</span>
              </button>

              <div className="hidden sm:flex items-center space-x-2 text-sm font-semibold text-slate-100 ml-3.5">
                <span>Vendors</span>
                <Icons.ChevronRight />
                <span className="text-slate-300 font-medium">{vendor.name}</span>
              </div>
            </div>

            {/* Vendor Name and Status (Mobile) */}
            <div className="flex items-center space-x-3 sm:hidden">
              <span className="font-semibold text-slate-900 truncate">{vendor.name}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(vendor.status)}`}>
                {vendor.status}
              </span>
            </div>

            {/* Desktop Status */}
            <div className=" sm:block">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(vendor.status)}`}>
                {vendor.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vendor Header */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Left Side - Vendor Info */}
            <div className="flex items-start space-x-4 mb-6 lg:mb-0">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {getInitials(vendor.name)}
              </div>

              {/* Vendor Details */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-slate-100 mb-2">{vendor.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">{renderStars(vendor.rating)}</div>
                  <span className="text-sm font-medium text-slate-200">{vendor.rating}</span>
                  <span className="text-sm text-slate-300">({vendor.totalReviews} reviews)</span>
                </div>

                {/* Category and Location */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200 mb-4">
                  <div className="flex items-center space-x-1">
                    <Icons.Tag className="w-4 h-4" />
                    <span>{vendor.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.MapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.Calendar className="w-4 h-4" />
                    <span>Member since {vendor.joinDate}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-200 leading-relaxed">{vendor.description}</p>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="lg:ml-8 lg:flex-shrink-0">
              <div className="bg-slate-800 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-slate-50 mb-3">Contact Information</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icons.User className="text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">{vendor.contactPerson}</p>
                      <p className="text-xs text-slate-300">Contact Person</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icons.Mail className="text-slate-300 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-300">{vendor.email}</p>
                      <p className="text-xs text-slate-200">Email</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icons.Phone/>
                    <div>
                      <p className="text-sm font-medium text-slate-300">{vendor.phone}</p>
                      <p className="text-xs text-slate-200">Phone</p>
                    </div>
                  </div>

                  {vendor.website && (
                    <div className="flex items-center space-x-3">
                      <Icons.Building className="text-slate-300 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {vendor.website}
                        </p>
                        <p className="text-xs text-slate-200">Website</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services Offered */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Services Offered</h2>
            {vendor.services && vendor.services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vendor.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-slate-900 rounded-lg border border-slate-300"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-slate-200">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icons.Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No services listed</p>
              </div>
            )}
          </div>

          {/* Recent Events */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-300 mb-4">Recent Events</h2>
            {vendor.recentEvents && vendor.recentEvents.length > 0 ? (
              <div className="space-y-4">
                {vendor.recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border border-slate-950 rounded-lg p-4 hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-slate-200 flex-1">{event.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getEventStatusColor(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                      <div className="flex items-center space-x-1">
                        <Icons.Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icons.Tag className="w-4 h-4" />
                        <span>{event.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icons.User className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icons.Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No recent events</p>
              </div>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-8 bg-slate-800 rounded-lg border border-slate-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Documents</h2>
          {vendor.documents && vendor.documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendor.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-slate-950 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getFileIcon(doc.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-200 truncate group-hover:text-purple-600 transition-colors">
                        {doc.name}
                      </h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center space-x-2 text-xs text-slate-300">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{formatDate(doc.uploadDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-slate-300 text-slate-900 rounded">
                            {doc.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded">
                      <Icons.Download />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icons.FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No documents uploaded</h3>
              <p className="text-slate-500">Documents will appear here once they are uploaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
