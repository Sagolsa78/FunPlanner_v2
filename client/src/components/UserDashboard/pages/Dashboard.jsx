import { Calendar, CheckCircle, Clock, Users, ShoppingCart, Plus, ArrowRight } from "lucide-react"
import { useState } from "react"
import CreateEvent from "../pop-ups/CreateEvent";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [events, setEvents] = useState([]);
  const [eventDistribution, setEventDistribution] = useState([]);
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
   const visibleEvents = events.slice(0, 3);

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');

      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/all-events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(res.data || []);
        console.log(res.data)
      } catch (error) {
        console.error('Failed to load Clients:', error.message)
      }
    }

    fetchEvent();
  }, [])


  // Event Distribution 
  useEffect(() => {
    const fetchDistribution = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.log('Token not found')

      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/events-distribution', {
          headers: { Authorization: `Bearer ${token}` }
        })

        setEventDistribution(res.data || []);
      } catch (error) {
        console.error('Error fetching event Distribution', error.message)
      }
    }
    fetchDistribution();
  }, [])

  // Stats 
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');

      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        setStats(
          [
            {
              title: "Upcoming",
              value: "8",
              icon: Calendar,
              iconColor: "text-blue-400",
              bgColor: "bg-blue-400/10",
            },
            {
              title: "Completed",
              value: "24",
              icon: CheckCircle,
              iconColor: "text-green-400",
              bgColor: "bg-green-400/10",
            },
            {
              title: "Events",
              value: data.totalEvents,
              icon: Clock,
              iconColor: "text-yellow-400",
              bgColor: "bg-yellow-400/10",
            },
            {
              title: "Clients",
              value: data.totalClients,
              icon: Users,
              iconColor: "text-purple-400",
              bgColor: "bg-purple-400/10",
            },
            {
              title: "Vendors",
              value: data.totalVendors,
              icon: ShoppingCart,
              iconColor: "text-blue-400",
              bgColor: "bg-blue-400/10",
            },
          ]
        )
      } catch (error) {
        console.error('Failed to load Clients:', error.message)
      }
    }

    fetchStats();
  }, [])


  return (
    <div className="min-h-screen bg-[#161b22] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your upcoming events</p>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Event Analytics */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">Event Analytics</h2>
              <div className="flex space-x-2">
                {["Month", "Quarter", "Year"].map((label, idx) => (
                  <button
                    key={idx}
                    className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded hover:bg-slate-700 transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8" />
                </div>
                <p>Analytics chart would go here</p>
              </div>
            </div>
          </div>

          {/* Event Distribution */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold mb-4">Event Distribution</h2>
            <div className="space-y-4">
              {eventDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.category}</span>
                    <span className="text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your Events */}
         <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">All Events</h2>
        <div className="flex space-x-2">
          {["All", "Upcoming", "Past"].map((label, idx) => (
            <button
              key={idx}
              className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded hover:bg-slate-700 transition"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleEvents.map((event, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-lg bg-gradient-to-br ${event.gradient} min-h-[200px] flex flex-col justify-between`}
          >
            <div className="absolute top-4 right-4">
              <span className="bg-black/20 text-white text-xs px-2 py-1 rounded-full">{event.date}</span>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white">{event.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {events.length > 3 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate('/event-dashboard')}
            className="text-sm text-slate-500 hover:text-white px-4 py-2 rounded hover:bg-slate-700 transition cursor-pointer"
          >
            Show More <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
      </div>

    </div>

  )
}
