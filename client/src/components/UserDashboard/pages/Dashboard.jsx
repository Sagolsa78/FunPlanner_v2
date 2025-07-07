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
              value: data.totalEvents,
              icon: Calendar,
              iconColor: "text-blue-400",
              bgColor: "bg-blue-400/10",
            },
            {
              title: "Completed",
              value: "0",
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
  <div className="min-h-screen bg-[#0f1117] text-white p-6">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Track and manage your events efficiently</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="text-xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Event Analytics */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">Event Analytics</h2>
            <div className="flex space-x-2">
              {["Month", "Quarter", "Year"].map((label, idx) => (
                <button
                  key={idx}
                  className="text-sm px-3 py-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-slate-500 border border-dashed border-slate-600 rounded-lg">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <p>Analytics chart placeholder</p>
            </div>
          </div>
        </div>

        {/* Event Distribution */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-white text-lg font-semibold mb-4">Event Distribution</h2>
          <div className="space-y-5">
            {eventDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>{item.category}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Events */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">All Events</h2>
          <div className="flex space-x-2">
            {["All", "Upcoming", "Past"].map((label, idx) => (
              <button
                key={idx}
                className="text-sm text-slate-400 hover:text-white px-3 py-1 rounded-md hover:bg-slate-700 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleEvents.map((event, index) => (
            <div
              key={index}
              className={`relative p-5 rounded-xl bg-gradient-to-br ${event.gradient} min-h-[180px] flex flex-col justify-between shadow-md`}
            >
              <span className="absolute top-4 right-4 bg-black/30 text-xs px-2 py-1 rounded-full">
                {event.date}
              </span>
              <div className="mt-6">
                <h3 className="text-lg font-bold">{event.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        {events.length > 3 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate('/event-dashboard')}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-white px-4 py-2 rounded-md hover:bg-slate-700 transition"
            >
              Show More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
