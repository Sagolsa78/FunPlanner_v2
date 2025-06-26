"use client"

import {
  Plus,
  Filter,
  LayoutGrid,
  Circle,
  BarChart3,
  MoreHorizontal,
} from "lucide-react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import Dashboard from "./Dashboard"

const DashboardLayout = () => {
  const todoItems = [
    {
      id: "INN-1",
      title: "Welcome to Linear",
      hasEmoji: true,
      emoji: "👋",
    },
    { id: "INN-2", title: "3 ways to navigate Linear: Command menu, keyboard or mouse" },
    { id: "INN-3", title: "Connect to Slack" },
    { id: "INN-4", title: "Connect GitHub or GitLab" },
    { id: "INN-5", title: "Customize settings" },
    { id: "INN-6", title: "Use Cycles to focus work over n-weeks" },
    { id: "INN-7", title: "Use Projects to organize work for features or releases" },
    { id: "INN-8", title: "Invite your teammates" },
    { id: "INN-9", title: "Next steps" },
  ]

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white">
      {/* Topbar spanning full width */}
      <Topbar />

      {/* Main layout with sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
         <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
      </div>
    </div>
  )
}

export default DashboardLayout;
