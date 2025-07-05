import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getSocket } from '../../lib/socket';

export const subscribeToMessages = () => (dispatch, getState) => {
    const { selectedUser } = getState().chat;
    const socket = getSocket();

    if (!selectedUser || !socket) return;

    const listener = (newMessage) => {
        const isRelevant =
            newMessage.senderId === selectedUser._id ||
            newMessage.receiverId === selectedUser._id;

        if (isRelevant) {
            dispatch(addMessage(newMessage));
        }
    };

    socket.on('newMessage', listener);
    socket._messageListener = listener;
};

export const unsubscribeFromMessages = () => () => {
    const socket = getSocket();
    if (socket && socket._messageListener) {
        socket.off('newMessage', socket._messageListener);
        delete socket._messageListener;
    }
};


export const getUsers = createAsyncThunk('chat/getUsers', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/chat/getUsers');
        return res.data;
    } catch (error) {
        toast.error('Failed to fetch users');
        return rejectWithValue(error.response.data);
    }
})

export const getMessages = createAsyncThunk('chat/getChats', async (userId, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/chat/getChats/${userId}`);
        return res.data;
    } catch (error) {
        toast.error('Failed to fetch chats');
        return rejectWithValue(error.response.data);
    }
})

export const sendMessage = createAsyncThunk('chat/sendChat', async (chatData, thunkAPI) => {
    const state = thunkAPI.getState();
    const selectedUser = state.chat.selectedUser;

    try {
        const res = await axiosInstance.post(`/chat/sendChat/${selectedUser._id}`, chatData);
        return res.data;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send message');
        return thunkAPI.rejectWithValue(error.response?.data);
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        users: [],
        messages: [],
        selectedUser: null,
        isUserLoading: false,
        isChatLoading: false,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        addMessage: (state, action) => {
            const newChat = action.payload;
            const isFromSelectedUser = newChat.senderId === state.selectedUser?._id;
            if (isFromSelectedUser) {
                state.messages.push(newChat);
            }
        },

        clearChat: (state) => {
            state.messages = [];
            state.selectedUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isUserLoading = false;
            })

            .addCase(getMessages.pending, (state) => {
                state.isChatLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.isChatLoading = false;
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state) => {
                state.isChatLoading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
    }
});


export const { setSelectedUser, addMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;