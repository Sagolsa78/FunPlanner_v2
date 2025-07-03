"use client"

import { useState, useMemo } from "react"
import {
  X,
  Search,
  Filter,
  ChevronDown,
  User,
  DollarSign,
  Tag,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  AlertTriangle,
  Utensils,
  Mic,
  Shield,
  Heart,
  Plus,
  Trash2,
} from "lucide-react"

export default function AssignVendor({ isOpen, onClose, eventId }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedVendors, setSelectedVendors] = useState([])
  const [budgetAllocations, setBudgetAllocations] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample vendor data - allocatedBudget removed
  const vendors = [
    {
      id: 1,
      name: "Elite Catering Solutions",
      service: "Catering",
      contactPerson: "Sarah Johnson",
      email: "sarah@elitecatering.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      description: "Premium catering services for corporate events",
    },
    {
      id: 2,
      name: "Sound & Vision AV",
      service: "Audio/Visual",
      contactPerson: "Mike Chen",
      email: "mike@soundvision.com",
      phone: "+1 (555) 987-6543",
      status: "pending",
      description: "Professional audio and visual equipment rental",
    },
    {
      id: 3,
      name: "Bloom Floral Design",
      service: "Decoration",
      contactPerson: "Emma Davis",
      email: "emma@bloomfloral.com",
      phone: "+1 (555) 456-7890",
      status: "active",
      description: "Creative floral arrangements and event decoration",
    },
    {
      id: 4,
      name: "Pro Security Services",
      service: "Security",
      contactPerson: "John Smith",
      email: "john@prosecurity.com",
      phone: "+1 (555) 321-0987",
      status: "active",
      description: "Professional security and crowd management",
    },
    {
      id: 5,
      name: "Crystal Clear Audio",
      service: "Audio/Visual",
      contactPerson: "Lisa Rodriguez",
      email: "lisa@crystalclear.com",
      phone: "+1 (555) 654-3210",
      status: "flagged",
      description: "High-end audio equipment and technical support",
    },
    {
      id: 6,
      name: "Elegant Events Decor",
      service: "Decoration",
      contactPerson: "David Wilson",
      email: "david@elegantevents.com",
      phone: "+1 (555) 789-0123",
      status: "pending",
      description: "Luxury event decoration and styling services",
    },
    {
      id: 7,
      name: "Gourmet Delights Catering",
      service: "Catering",
      contactPerson: "Maria Garcia",
      email: "maria@gourmetdelights.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      description: "Fine dining and gourmet catering experiences",
    },
    {
      id: 8,
      name: "Guardian Security Group",
      service: "Security",
      contactPerson: "Robert Taylor",
      email: "robert@guardiansec.com",
      phone: "+1 (555) 876-5432",
      status: "flagged",
      description: "Comprehensive security solutions for events",
    },
  ]

  // Filter vendors based on search and filters
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.service.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
      const matchesCategory = categoryFilter === "all" || vendor.service.toLowerCase() === categoryFilter.toLowerCase()

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [searchTerm, statusFilter, categoryFilter, vendors])

  // Handle vendor selection
  const handleVendorSelect = (vendorId, isSelected) => {
    if (isSelected) {
      setSelectedVendors([...selectedVendors, vendorId])
      setBudgetAllocations({ ...budgetAllocations, [vendorId]: "" })
    } else {
      setSelectedVendors(selectedVendors.filter((id) => id !== vendorId))
      const newBudgetAllocations = { ...budgetAllocations }
      delete newBudgetAllocations[vendorId]
      setBudgetAllocations(newBudgetAllocations)
    }
  }

  // Handle budget allocation change
  const handleBudgetChange = (vendorId, budget) => {
    setBudgetAllocations({
      ...budgetAllocations,
      [vendorId]: budget,
    })
  }

  // Remove selected vendor
  const removeSelectedVendor = (vendorId) => {
    setSelectedVendors(selectedVendors.filter((id) => id !== vendorId))
    const newBudgetAllocations = { ...budgetAllocations }
    delete newBudgetAllocations[vendorId]
    setBudgetAllocations(newBudgetAllocations)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for backend
      const vendorAssignments = selectedVendors.map((vendorId) => {
        const vendor = vendors.find((v) => v.id === vendorId)
        return {
          vendorId,
          vendorName: vendor.name,
          service: vendor.service,
          contactPerson: vendor.contactPerson,
          allocatedBudget: Number.parseFloat(budgetAllocations[vendorId]) || 0,
          eventId,
        }
      })

      // Here you would make the API call using axios
      // Example:
      // const response = await axios.post('/api/events/assign-vendors', {
      //   eventId,
      //   vendors: vendorAssignments
      // })

      console.log("Submitting vendor assignments:", vendorAssignments)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form and close popup on success
      setSelectedVendors([])
      setBudgetAllocations({})
      onClose()

      // You might want to show a success message here
      alert("Vendors assigned successfully!")
    } catch (error) {
      console.error("Error assigning vendors:", error)
      alert("Error assigning vendors. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "active":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="w-3 h-3" />,
        }
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Clock className="w-3 h-3" />,
        }
      case "flagged":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertTriangle className="w-3 h-3" />,
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Clock className="w-3 h-3" />,
        }
    }
  }

  // Get service icon
  const getServiceIcon = (service) => {
    switch (service.toLowerCase()) {
      case "catering":
        return <Utensils className="w-5 h-5 text-orange-500" />
      case "audio/visual":
        return <Mic className="w-5 h-5 text-purple-500" />
      case "decoration":
        return <Heart className="w-5 h-5 text-pink-500" />
      case "security":
        return <Shield className="w-5 h-5 text-blue-500" />
      default:
        return <Tag className="w-5 h-5 text-gray-500" />
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Calculate total budget
  const totalBudget = Object.values(budgetAllocations).reduce((sum, budget) => {
    return sum + (Number.parseFloat(budget) || 0)
  }, 0)

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCategoryFilter("all")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Assign Event Vendors</h2>
              <p className="text-sm text-slate-400">
                {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""} available •{" "}
                {selectedVendors.length} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Side - Vendor List */}
          <div className="flex-1 flex flex-col">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-700 bg-slate-900">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search vendors by name, contact person, or service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[140px]"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="flagged">Flagged</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[160px]"
                  >
                    <option value="all">All Categories</option>
                    <option value="decoration">Decoration</option>
                    <option value="audio/visual">Audio/Visual</option>
                    <option value="security">Security</option>
                    <option value="catering">Catering</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Reset Filters Button */}
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Vendor List */}
            <div className="flex-1 overflow-y-auto">
              {filteredVendors.length > 0 ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredVendors.map((vendor) => {
                      const statusInfo = getStatusInfo(vendor.status)
                      const isSelected = selectedVendors.includes(vendor.id)
                      return (
                        <div
                          key={vendor.id}
                          className={`bg-slate-700 rounded-lg p-5 border transition-colors cursor-pointer ${
                            isSelected ? "border-purple-500 bg-slate-600" : "border-slate-600 hover:border-slate-500"
                          }`}
                          onClick={() => handleVendorSelect(vendor.id, !isSelected)}
                        >
                          {/* Vendor Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleVendorSelect(vendor.id, e.target.checked)}
                                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-500 rounded focus:ring-purple-500 focus:ring-2"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex-shrink-0">{getServiceIcon(vendor.service)}</div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white truncate">{vendor.name}</h3>
                                <p className="text-sm text-slate-300">{vendor.service}</p>
                              </div>
                            </div>
                            <span
                              className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${statusInfo.color}`}
                            >
                              {statusInfo.icon}
                              <span className="capitalize">{vendor.status}</span>
                            </span>
                          </div>

                          {/* Contact Information */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-slate-300">
                              <User className="w-4 h-4 text-slate-400" />
                              <span>{vendor.contactPerson}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-300">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span>{vendor.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-300">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <span>{vendor.phone}</span>
                            </div>
                          </div>

                          {/* Description */}
                          {vendor.description && (
                            <div className="pt-3 border-t border-slate-600">
                              <p className="text-sm text-slate-300 leading-relaxed">{vendor.description}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No vendors found</h3>
                  <p className="text-slate-400 text-center mb-4">
                    Try adjusting your search criteria or filters to find vendors.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Selected Vendors & Budget Allocation Form */}
          <div className="w-96 border-l border-slate-700 bg-slate-900 flex flex-col">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-2">Selected Vendors</h3>
              <p className="text-sm text-slate-400">
                {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""} selected
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {selectedVendors.length > 0 ? (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {selectedVendors.map((vendorId) => {
                    const vendor = vendors.find((v) => v.id === vendorId)
                    return (
                      <div key={vendorId} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {getServiceIcon(vendor.service)}
                            <div>
                              <h4 className="font-medium text-white text-sm">{vendor.name}</h4>
                              <p className="text-xs text-slate-400">{vendor.service}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSelectedVendor(vendorId)}
                            className="text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Allocated Budget</label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              value={budgetAllocations[vendorId] || ""}
                              onChange={(e) => handleBudgetChange(vendorId, e.target.value)}
                              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Total Budget */}
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">Total Budget:</span>
                      <span className="text-lg font-bold text-green-400">{formatCurrency(totalBudget)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || selectedVendors.length === 0}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Assigning...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Assign Vendors</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No vendors selected</h3>
                  <p className="text-slate-400 text-center">
                    Select vendors from the list to allocate budgets and assign them to this event.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
