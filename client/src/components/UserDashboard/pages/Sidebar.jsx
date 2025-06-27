import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  Circle,
  BarChart3,
  Bell,
  MoreHorizontal,
  ChevronDown,
  Inbox,
  User,
  FolderOpen,
  Eye,
  Upload,
  UserPlus,
  Github, Home, Calendar, Users, ClipboardList, ShoppingCart, DollarSign, Settings
} from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {

  const settingItem = [
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
      active: false,
    },
  ]

  const sidebarItems = [
     {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: true,
    },
    {
      label: "Inbox",
      icon: Inbox,
      href: "/inbox",
      active: false,
    }
  ]

  const workspaceItems = [
     {
      label: "Calendar",
      icon: Calendar,
      href: "/calendar",
      active: false,
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      href: "/tasks",
      active: false,
    },
    
    {
      label: "Finances",
      icon: DollarSign,
      href: "/finances",
      active: false,
    },
  ]

  const teamItems = [
    { icon: Circle, label: "Issues", active: true },
    { icon: FolderOpen, label: "Tasks", active: false },
    { icon: Eye, label: "Views", active: false },
  ]

  const tryItems = [
     {
      label: "Vendors",
      icon: ShoppingCart,
      href: "/vendor-dashboard",
      active: false,
    },
    
    {
      label: "Clients",
      icon: Users,
      href: "/client-dashboard",
      active: false,
    },
  ]
  return (
    <div className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col">
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="p-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-800 ${
                item.active ? "bg-gray-800" : ""
              }`}
            >
              <item.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Workspace Section */}
        <div className="px-2 mt-6">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-gray-400 font-medium">Workspace</span>
            {/* <ChevronDown className="w-3 h-3 text-gray-400" /> */}
          </div>
          {workspaceItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-800"
            >
              <item.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Your teams Section */}
        <div className="px-2 mt-6">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-gray-400 font-medium">Your teams</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          <div className="px-3 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                <span className="text-[10px] text-black font-bold">I</span>
              </div>
              <span className="text-sm">InnovateX</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
          {teamItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 ${
                item.active ? "bg-gray-800" : ""
              }`}
            >
              <item.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Try Section */}
        <div className="px-2 mt-6">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-gray-400 font-medium">Connections</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          {tryItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-800"
            >
              <item.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* username - moved to the bottom */}
      <div className="p-4 border-t border-gray-800"> {/* Changed border-b to border-t */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-black font-bold text-sm">
            IN
          </div>
          <span className="font-semibold">InnovateX</span>
          {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;