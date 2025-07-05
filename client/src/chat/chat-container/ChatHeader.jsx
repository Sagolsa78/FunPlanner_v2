import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/slices/chatSlice"

const ChatHeader = () => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  if (!selectedUser) return null; // Prevent crash if no user is selected

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full relative bg-slate-700 text-white flex items-center justify-center font-semibold text-sm uppercase overflow-hidden">
  {selectedUser.profilePic ? (
    <img
      src={selectedUser.profilePic}
      alt={selectedUser.fullname}
      className="w-full h-full object-cover"
    />
  ) : (
    <span>{selectedUser.fullname?.charAt(0)}</span>
  )}
</div>


          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => dispatch(setSelectedUser(null))}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
