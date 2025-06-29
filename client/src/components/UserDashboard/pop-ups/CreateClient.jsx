"use client"

import { Calendar, ChevronDown, X, Phone } from "lucide-react"
import { useState } from "react";
import axios from "axios";

export default function CreateClient({ isOpen, onClose }) {
    if (!isOpen) return null

    const [clientName, setClientName] = useState("");
    // const [clientType, setClientType] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [internalNotes, setInternalNotes] = useState("");

    const handleCreateClient = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                'http://localhost:5000/api/clients/create-client',
                {
                    name: clientName,
                    email,
                    phone: contact,
                    address,
                    notes: internalNotes || "", // optional field
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Client created successfully:', response.data);

            // Reset form fields
            setClientName('');
            // setClientType('');
            setEmail('');
            setContact('');
            setAddress('');
        } catch (error) {
            console.error('Error creating Client:', error.response?.data?.message || error.message);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl font-bold text-white">Client Details</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-slate-400 text-sm">Client ID:</span>
                            <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">AUTO-GENERATED</span>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleCreateClient}>
                    <div className="p-6 space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                                <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-slate-300 text-sm">
                                        Client Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter event name"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                {/* <div className="space-y-2">
                                    <label className="text-slate-300 text-sm">
                                        Client Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={clientType}
                                            onChange={(e) => setClientType(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select client type</option>
                                            <option value="corporate">Corporate</option>
                                            <option value="social">Individual</option>
                                            <option value="tech">Non-Profit</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                                <h3 className="text-lg font-semibold text-white">Contact Info</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-slate-300 text-sm">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="FunPlanner@gmail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-slate-300 text-sm">
                                        Contact no. <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                        <input
                                            type="tel"
                                            placeholder="938XXXX850"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            className="w-full  bg-slate-800 border border-slate-700 rounded-lg px-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Client's address */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                                <h3 className="text-lg font-semibold text-white">Client's Address</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter client address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                                <h3 className="text-lg font-semibold text-white">Internal Notes</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm">
                                    Notes <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Important notes about client.."
                                    value={internalNotes}
                                    onChange={(e) => setInternalNotes(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>


                        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
                            <button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition duration-200"
                            >
                                Create Client
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
