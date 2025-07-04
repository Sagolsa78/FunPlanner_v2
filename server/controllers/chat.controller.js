import User from "../models/user.model.js";
import Message from "../models/chat.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getUsersforSidebar = async (req, res) => { 
    try {
      
      const loggedInUser = req.user._id;

      const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select('-password ');

      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error fetching users for sidebar:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
  try {
    const {id:UserToChatId} = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or:[
        {senderId: myId, recieverId: UserToChatId},
        {senderId: UserToChatId, recieverId: myId}
      ]
    })
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const sendMessage = async (req,res) =>{
  try {
    const {text,image} = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if(image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image:imageUrl ||null
    })

    await newMessage.save();

    // realtime functionality goes here (socket.io)

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}