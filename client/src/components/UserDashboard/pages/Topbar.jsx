import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  Circle,
  BarChart3,
  Bell,
  MoreHorizontal,
  Slack,
} from "lucide-react"
import { useState } from "react"

const Topbar = ()=>{
    const [activeTab, setActiveTab] = useState("All issues")

    const tabs = ["All issues", "Active", "Backlog"]
    return(
        <div className="h-14 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center ml-14">
            <a href="/" className="flex items-center space-x-2">
              <Slack className="w-8 h-8 text-white"/>
              <span className="text-white font-medium font-sans text-lg">Fun Planner</span>
            </a>
          </div>
            {/* Search */}
            <div className="relative px-24">
              <Search className="w-4 h-4 absolute  ml-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Create New
            <button className="p-2 hover:bg-gray-800 rounded-md">
              <Plus className="w-4 h-4" />
            </button> */}

            {/* Tabs */}
            {/* <div className="flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeTab === tab ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div> */}

                        
            
            {/* Additional Controls */}
            {/* <div className="flex items-end space-x-2">
              <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-400 hover:text-white">
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div> */}
          </div>


          {/* create CLients */}
            <button className=" justify-items-end bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 gover:to-indigo text-white px-4 py-2  rounded-md font-medium transition-all duration-300 shadow hver:shadow-lg">
              Create Client
            </button>

          {/* create vendors */}
           <button className="justify-items-end bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 gover:to-indigo text-white px-4 py-2  rounded-md font-medium transition-all duration-300 shadow hver:shadow-lg">
              Create Vendor
            </button>




          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-gray-400" />
            <LayoutGrid className="w-4 h-4 text-gray-400" />
          </div>
        </div>
    )
}

export default Topbar;