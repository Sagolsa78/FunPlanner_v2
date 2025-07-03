
"use client"

import { useState } from "react"
import {
    User,
    Building2,
    Phone,
    Mail,
    Calendar,
    Eye,
    Edit,
    Copy,
    MessageSquare,
    DollarSign,
    FileText,
    Upload,
    Download,
    Plus,
    UserCheck,
    Send,
    FileDown,
    MoreHorizontal,
    CheckCircle,
    Clock,
    AlertCircle,
    Paperclip,
    Tag,
    Star,
    Pencil,
    UserRoundPen
} from "lucide-react"
import CreateEvent from "../pop-ups/CreateEvent";
import { useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";

export default function ClientDashboard() {
    const [events, setEvents] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all")
    const [activeLogTab, setActiveLogTab] = useState("all")
    const [activeFileTab, setActiveFileTab] = useState("all")
    const { id } = useParams();
    const [client, setClient] = useState([])
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPreferences, setEditedPreferences] = useState("");

    useEffect(() => {
        const fetchClient = async () => {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            try {
                const res = await axios.get(`http://localhost:5000/api/clients/client-stats/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClient(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load clients", err);
                setLoading(false);
            }
        };

        fetchClient();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');
            if (!token) return console.error('No token found');
            try {
                const response = await axios.get(`http://localhost:5000/api/events/clients-event-data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setEvents(response.data || []);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error("Failed to load clients", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const preferences = {
        eventStyles: ["Corporate", "Modern", "Tech-focused"],
        preferredVenues: ["Convention Center", "Hotel Ballrooms", "Outdoor Spaces"],
        dietaryNeeds: ["Vegetarian options", "Gluten-free", "Halal"],
        specialRequirements: ["AV Equipment", "Live Streaming", "Photography"],
    }

    const communications = [
        {
            id: 1,
            type: "email",
            subject: "Event Planning Discussion",
            date: "Feb 28, 2024",
            from: "John Doe",
            hasAttachment: true,
        },
        {
            id: 2,
            type: "meeting",
            subject: "Venue Selection Meeting",
            date: "Feb 25, 2024",
            from: "Sarah Johnson",
            hasAttachment: false,
        },
        {
            id: 3,
            type: "email",
            subject: "Budget Approval",
            date: "Feb 22, 2024",
            from: "Sarah Johnson",
            hasAttachment: true,
        },
    ]

    const files = [
        {
            id: 1,
            name: "Event_Contract_2024.pdf",
            type: "contract",
            size: "2.4 MB",
            event: "Annual Tech Conference 2024",
            uploadDate: "Feb 20, 2024",
        },
        {
            id: 2,
            name: "Venue_Photos.zip",
            type: "media",
            size: "15.2 MB",
            event: "Product Launch Event",
            uploadDate: "Jan 15, 2024",
        },
        {
            id: 3,
            name: "Budget_Breakdown.xlsx",
            type: "financial",
            size: "1.1 MB",
            event: "Team Building Retreat",
            uploadDate: "Feb 05, 2024",
        },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-500"
            case "inactive":
                return "bg-red-500"
            case "upcoming":
                return "bg-blue-500"
            case "ongoing":
                return "bg-yellow-500"
            case "completed":
                return "bg-green-500"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "upcoming":
                return <Clock className="w-4 h-4" />
            case "ongoing":
                return <AlertCircle className="w-4 h-4" />
            case "completed":
                return <CheckCircle className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    if (client) {
        console.log(client.name)
        return (
            <div className="min-h-screen bg-[#161b22] text-white p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-semibold text-white">Client Dashboard</h1>
                            <p className="text-slate-400 mt-1">Manage client information and events</p>
                        </div>

                        {/* Global Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded inline-flex items-center cursor-pointer">
                                <Plus className="w-4 h-4 mr-2" />
                                Create New Event
                            </button>
                            <button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                                <UserCheck className="w-4 h-4 mr-2" />
                                Assign Manager
                            </button>
                            <button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                                <Send className="w-4 h-4 mr-2" />
                                Send Email
                            </button>
                            <button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                                <FileDown className="w-4 h-4 mr-2" />
                                Export Info
                            </button>
                        </div>
                    </div>

                    {/* Top Row - Client Overview and Financial Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Client Overview */}
                        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <User className="w-5 h-5 text-purple-400" />
                                <h2 className="text-white text-lg font-semibold">Client Overview</h2>
                            </div>
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Building2 className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-300">{client.company}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-300 text-sm">{client.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-300 text-sm">{client.phone}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-slate-400 text-sm">Account Manager:</span>
                                            <span className="text-white text-sm font-medium">{client.accountManager}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-slate-400 text-sm">Client Since:</span>
                                            <span className="text-white text-sm">{client.joinDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(client.status)}`}></div>
                                    <span className="text-sm font-medium capitalize">{client.status}</span>
                                </div>
                            </div>
                        </div>

                        {/* Financial Overview */}
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                <h2 className="text-white text-lg font-semibold">Financial Overview</h2>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Total Spend</span>
                                    <span className="text-xl font-bold text-green-400">{client.totalSpend}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Outstanding</span>
                                    <span className="text-lg font-semibold text-yellow-400">{client.outstandingAmount}</span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-slate-700 mt-4">
                                <button className="w-full flex items-center justify-center border border-slate-600 text-slate-300 hover:bg-slate-700 px-4 py-2 text-sm rounded">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Receipts
                                </button>
                                <button className="w-full flex items-center justify-center border border-slate-600 text-slate-300 hover:bg-slate-700 px-4 py-2 text-sm rounded">
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Contracts
                                </button>
                            </div>
                        </div>

                    </div>


                    {/* Associated Events List */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <h2 className="text-white text-lg font-semibold">Associated Events</h2>
                            </div>

                            {/* filter */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab("all")}
                                    className={`px-3 py-1 text-sm rounded ${activeTab === "all"
                                        ? "bg-purple-600 text-white"
                                        : "text-slate-400 hover:text-white border border-transparent"
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveTab("upcoming")}
                                    className={`px-3 py-1 text-sm rounded ${activeTab === "upcoming"
                                        ? "bg-purple-600 text-white"
                                        : "text-slate-400 hover:text-white border border-transparent"
                                        }`}
                                >
                                    Upcoming
                                </button>
                                <button
                                    onClick={() => setActiveTab("completed")}
                                    className={`px-3 py-1 text-sm rounded ${activeTab === "completed"
                                        ? "bg-purple-600 text-white"
                                        : "text-slate-400 hover:text-white border border-transparent"
                                        }`}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {events.map((event) => (
                               <Link 
                               key={event.id}
                               to={`/event-profile/${event.id}`}
                               className="bg-[#1d293d] text-white  border-slate-600  hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer group"
                               >
                                <div key={event.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg ${getStatusColor(event.status)}/20`}>
                                            {getStatusIcon(event.status)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{event.name}</h4>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-slate-400 text-sm">{event.date}</span>
                                                <span className="text-slate-400 text-sm">Budget: {event.budget}</span>
                                                <span className="text-slate-400 text-sm">{event.attendees} attendees</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)} text-white`}>
                                            {event.status}
                                        </span>
                                        <button className="p-2 text-slate-400 hover:text-white">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-white">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-white">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                               </Link>
                            ))}
                        </div>
                    </div>


                    {/* Middle Row - Preferences and Communication Log */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Client Preferences */}
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <h2 className="text-white text-lg font-semibold ">Client Preferences</h2>
                            </div>
                            <button className="text-slate-400 hover:text-white p-2 rounded-lg cursor-pointer">
                                <UserRoundPen />
                            </button>
                            </div>

                            <div>
                                <h4 className="font-medium text-white mb-2">Event Styles</h4>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.eventStyles.map((style, index) => (
                                        <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                                            {style}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-white mb-2">Preferred Venues</h4>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.preferredVenues.map((venue, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                                            {venue}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-white mb-2">Dietary Requirements</h4>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.dietaryNeeds.map((need, index) => (
                                        <span key={index} className="px-2 py-1 bg-green-600/20 text-green-300 rounded-full text-sm">
                                            {need}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-white mb-2">Special Requirements</h4>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.specialRequirements.map((req, index) => (
                                        <span key={index} className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded-full text-sm">
                                            {req}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Communication Log */}
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                    <MessageSquare className="w-5 h-5 text-green-400" />
                                    <h2 className="text-white text-lg font-semibold">Communication Log</h2>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveLogTab("all")}
                                        className={`px-3 py-1 text-sm rounded ${activeLogTab === "all"
                                            ? "bg-purple-600 text-white"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setActiveLogTab("emails")}
                                        className={`px-3 py-1 text-sm rounded ${activeLogTab === "emails"
                                            ? "bg-purple-600 text-white"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        Emails
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {communications.map((comm) => (
                                    <div key={comm.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${comm.type === "email" ? "bg-blue-600/20" : "bg-green-600/20"}`}>
                                                {comm.type === "email" ? (
                                                    <Mail className="w-4 h-4 text-blue-400" />
                                                ) : (
                                                    <MessageSquare className="w-4 h-4 text-green-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-white text-sm">{comm.subject}</h5>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-slate-400 text-xs">{comm.from}</span>
                                                    <span className="text-slate-500 text-xs">•</span>
                                                    <span className="text-slate-400 text-xs">{comm.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {comm.hasAttachment && <Paperclip className="w-4 h-4 text-slate-400" />}
                                            <button className="p-2 text-slate-400 hover:text-white">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Bottom Row - File Manager and Internal Notes */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* File Manager */}
                        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                    <FileText className="w-5 h-5 text-orange-400" />
                                    <h2 className="text-white text-lg font-semibold">File Manager</h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="flex items-center px-3 py-1 border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload
                                    </button>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => setActiveFileTab("all")}
                                            className={`px-3 py-1 text-sm rounded ${activeFileTab === "all"
                                                ? "bg-purple-600 text-white"
                                                : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => setActiveFileTab("contracts")}
                                            className={`px-3 py-1 text-sm rounded ${activeFileTab === "contracts"
                                                ? "bg-purple-600 text-white"
                                                : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            Contracts
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-600/20 rounded-lg">
                                                <FileText className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-white text-sm">{file.name}</h5>
                                                <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400">
                                                    <span>{file.event}</span>
                                                    <span className="text-slate-500">•</span>
                                                    <span>{file.size}</span>
                                                    <span className="text-slate-500">•</span>
                                                    <span>{file.uploadDate}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${file.type === "contract"
                                                    ? "bg-purple-600/20 text-purple-300"
                                                    : file.type === "media"
                                                        ? "bg-green-600/20 text-green-300"
                                                        : "bg-blue-600/20 text-blue-300"
                                                    }`}
                                            >
                                                {file.type}
                                            </span>
                                            <button className="p-2 text-slate-400 hover:text-white">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-white">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>



                        {/* Internal Notes */}
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <Tag className="w-5 h-5 text-red-400" />
                                <h2 className="text-white text-lg font-semibold">Internal Notes</h2>
                            </div>

                            <div className="space-y-3">
                                <div className="p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-400">Feb 28, 2024</span>
                                        <span className="px-2 py-1 bg-yellow-600/20 text-yellow-300 rounded-full text-xs">Priority</span>
                                    </div>
                                    <p className="text-sm text-slate-300">
                                        Client prefers morning events. Always confirm AV requirements 48hrs before.
                                    </p>
                                </div>

                                <div className="p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-400">Feb 20, 2024</span>
                                        <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">Info</span>
                                    </div>
                                    <p className="text-sm text-slate-300">
                                        Excellent communication. Quick to approve budgets and changes.
                                    </p>
                                </div>

                                <div className="p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-400">Jan 15, 2024</span>
                                        <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded-full text-xs">Success</span>
                                    </div>
                                    <p className="text-sm text-slate-300">
                                        Previous event exceeded expectations. Client very satisfied with results.
                                    </p>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center px-3 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Note
                            </button>
                        </div>
                    </div>

                </div>
                <CreateEvent isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            </div>
        )
    }
}
