import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',        
    required: true
    },
    text:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now   
    }
}, {
  timestamps: true
});

const Chat = mongoose.model('Chat',chatSchema);
export default Chat;