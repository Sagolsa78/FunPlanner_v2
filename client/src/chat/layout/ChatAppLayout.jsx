import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "../../lib/socket";
import { setOnlineUsers } from "../../redux/slices/authSlice";

import ChatSidebar from "../ChatSidebar";
import NoChatSelected from "../chat-container/NoChatSelected";
import ChatContainer from "../chat-container/ChatContainer";
import ChatTopbar from "../ChatTopbar";

const ChatAppLayout = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser?._id) {
      const socket = connectSocket(authUser._id);
      socket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUsers(userIds));
      });
    }
  }, [authUser, dispatch]);

  return (
    <div className="h-screen w-screen bg-[#161b22] text-white overflow-hidden flex flex-col">
      {/* Topbar stays at top */}
      <ChatTopbar />

      {/* Main chat area */}
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default ChatAppLayout;
