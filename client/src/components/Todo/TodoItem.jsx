"use client"

import { useState } from "react"
import { Circle, CheckCircle, Trash2, Flag, AlertCircle, Zap, Clock } from "lucide-react"

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return {
          icon: <Zap className="w-4 h-4" />,
          color: "text-red-400",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          label: "High",
        }
      case "low":
        return {
          icon: <Flag className="w-4 h-4" />,
          color: "text-blue-400",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/30",
          label: "Low",
        }
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          label: "Normal",
        }
    }
  }

  const priorityConfig = getPriorityConfig(todo.priority)
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div
      className={`group bg-slate-800/30 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/50 ${
        todo.completed ? "border-slate-700/50 opacity-75" : "border-slate-700"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo._id)}
            className={`flex-shrink-0 mt-1 transition-all duration-200 hover:scale-110 ${
              todo.completed ? "text-green-400" : "text-gray-400 hover:text-white"
            }`}
          >
            {todo.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p
                  className={`text-base transition-all duration-200 ${
                    todo.completed ? "text-gray-400 line-through" : "text-white group-hover:text-gray-100"
                  }`}
                >
                  {todo.text}
                </p>

                {/* Meta information */}
                <div className="flex items-center gap-4 mt-2">
                  {/* Priority Badge */}
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.borderColor} ${priorityConfig.color}`}
                  >
                    {priorityConfig.icon}
                    <span>{priorityConfig.label}</span>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(todo.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(todo._id)}
                className={`flex-shrink-0 p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Animation */}
      {todo.completed && <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-xl"></div>}
    </div>
  )
}

export default TodoItem
