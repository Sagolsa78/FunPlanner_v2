"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  Circle,
  BarChart3,
  Bell,
  MoreHorizontal,
} from "lucide-react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

const Dashboard = () => {
  const todoItems = [
    {
      id: "INN-1",
      title: "Welcome to Linear",
      hasEmoji: true,
      emoji: "👋",
    },
    {
      id: "INN-2",
      title: "3 ways to navigate Linear: Command menu, keyboard or mouse",
    },
    {
      id: "INN-3",
      title: "Connect to Slack",
    },
    {
      id: "INN-4",
      title: "Connect GitHub or GitLab",
    },
    {
      id: "INN-5",
      title: "Customize settings",
    },
    {
      id: "INN-6",
      title: "Use Cycles to focus work over n-weeks",
    },
    {
      id: "INN-7",
      title: "Use Projects to organize work for features or releases",
    },
    {
      id: "INN-8",
      title: "Invite your teammates",
    },
    {
      id: "INN-9",
      title: "Next steps",
    },
  ]

  return (
    <div className="flex h-screen bg-[#0d1117] text-white">
      {/* Left Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <Topbar/>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Filter Bar */}
          <div className="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter</span>
            </div>
            <div className="flex items-center space-x-2">
              <LayoutGrid className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Display</span>
            </div>
          </div>

          {/* Todo Section */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Todo</span>
                <span className="text-sm text-gray-400">9</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
            </div>

            {/* Todo Items */}
            <div className="space-y-1">
              {todoItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-md cursor-pointer group"
                >
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400 font-mono">{item.id}</span>
                  <Circle className="w-4 h-4 text-gray-500" />
                  <div className="flex-1 flex items-center space-x-2">
                    <span className="text-sm">
                      {item.title}
                      {item.hasEmoji && <span className="ml-2">{item.emoji}</span>}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">Jun 25</span>
                  <MoreHorizontal className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
