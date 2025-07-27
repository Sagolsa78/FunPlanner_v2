"use client"

import {
  Plus,
  Filter,
  LayoutGrid,
  Circle,
  BarChart3,
  MoreHorizontal,
} from "lucide-react"
import Sidebar from "../pages/Sidebar"
import Topbar from "../pages/Topbar"
import Dashboard from "../pages/Dashboard"
import { useState } from "react"

const DashboardLayout = () => {
  const[sidevisible,setSidevisible]=useState(false)
  

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white">
      {/* Topbar spanning full width */}
      <Topbar />

      {/* Main layout with sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onToggle={(visible)=>{setSidevisible(visible)}} />

        {/* Main Content Area */}
         <main className={`flex-1 overflow-auto transition-all duration-300 ${sidevisible ? "lg:ml-64 ml-0" : "ml-0"
            }`}>
        <Dashboard />
      </main>
      </div>
    </div>
  )
}

export default DashboardLayout;
