import { useSelector, useDispatch } from "react-redux";
import { getUsers, setSelectedUser } from "../redux/slices/chatSlice";
import { useState, useEffect } from "react";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const {
    users,
    selectedUser,
    isUsersLoading,
  } = useSelector((state) => state.chat);

  const { onlineUsers } = useSelector((state) => state.auth);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-[#161b22] border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-700 px-4 py-5">
        <div className="flex items-center gap-2 text-white">
          <Users className="size-6 text-white" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Online toggle */}
        <div className="mt-4 hidden lg:flex items-center gap-2 text-slate-400 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-accent"
            />
            Show online only
          </label>
          <span className="text-xs">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2 custom-scrollbar">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
                transition hover:bg-slate-700/50 ${isSelected ? "bg-slate-700/70 ring-1 ring-slate-500" : ""
                }`}
            >
              <div className="relative w-10 h-10">
                {/* Avatar or Initials */}
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-700 text-white flex items-center justify-center font-semibold text-sm uppercase border border-slate-600">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.fullname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user.fullname?.charAt(0)}</span>
                  )}
                </div>

                {/* Online Status Badge */}
                {isOnline && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-[#161b22]"
                  />
                )}
              </div>


              <div className="hidden lg:block text-left text-white truncate">
                <div className="font-semibold text-sm truncate">{user.fullname}</div>
                <div className="text-xs text-slate-400">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-sm text-slate-500 pt-6">
            No users to show
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
