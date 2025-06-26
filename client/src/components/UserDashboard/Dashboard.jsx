import { Calendar, CheckCircle, Clock, Users, ShoppingCart, Plus } from "lucide-react"

export default function Dashboard() {
  const stats = [
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
      title: "Tasks",
      value: "12",
      icon: Clock,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      title: "Clients",
      value: "18",
      icon: Users,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Vendors",
      value: "32",
      icon: ShoppingCart,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ]

  const eventDistribution = [
    { category: "Corporate", percentage: 45, color: "bg-purple-500" },
    { category: "Social", percentage: 25, color: "bg-pink-500" },
    { category: "Tech", percentage: 20, color: "bg-blue-500" },
    { category: "Charity", percentage: 10, color: "bg-green-500" },
  ]

  const events = [
    {
      title: "Annual Tech Conference",
      date: "Oct 15, 2023",
      gradient: "from-purple-500 to-blue-600",
    },
    {
      title: "Product Launch Party",
      date: "Nov 5, 2023",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Holiday Gala Dinner",
      date: "Dec 12, 2023",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-[#161b22] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">Event Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your upcoming events</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New Event
          </button>
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
            <h2 className="text-white text-lg font-semibold">Your Events</h2>
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
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-lg bg-gradient-to-br ${event.gradient} min-h-[200px] flex flex-col justify-between`}
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-black/20 text-white text-xs px-2 py-1 rounded-full">{event.date}</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
