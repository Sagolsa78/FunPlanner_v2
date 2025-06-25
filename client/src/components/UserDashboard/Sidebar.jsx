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
  Github,
} from "lucide-react"

const Sidebar=()=>{
     const sidebarItems = [
    { icon: Inbox, label: "Inbox", active: false },
    { icon: User, label: "My Issues", active: false },
  ]

    const workspaceItems = [
    { icon: FolderOpen, label: "Projects", active: false },
    { icon: Eye, label: "Views", active: false },
    { icon: MoreHorizontal, label: "More", active: false },
  ]

  const teamItems = [
    { icon: Circle, label: "Issues", active: true },
    { icon: FolderOpen, label: "Projects", active: false },
    { icon: Eye, label: "Views", active: false },
  ]

  const tryItems = [
    { icon: Upload, label: "Import issues", active: false },
    { icon: UserPlus, label: "Invite people", active: false },
    { icon: Github, label: "Link GitHub", active: false },
  ]
    return(
        <div className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-black font-bold text-sm">
              IN
            </div>
            <span className="font-semibold">InnovateX</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-2">
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
              <ChevronDown className="w-3 h-3 text-gray-400" />
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
              <span className="text-xs text-gray-400 font-medium">Try</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            {tryItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-800"
              >
                <item.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default Sidebar;