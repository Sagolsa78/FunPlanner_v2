import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';

export const getUsers = createAsyncThunk('chat/getUsers',async(_, {rejectWithValue}) => {
    try {
        const res = await axiosInstance.get('/chat/getUsers');
        return res.data;
    } catch (error) {
        toast.error('Failed to fetch users');
        return rejectWithValue(error.response.data);
    }
})

export const getChats = createAsyncThunk('chat/getChats', async(userId, {rejectWithValue}) => {
    try {
        const res = await axiosInstance.get(`/chat/getChats/${userId}`);
        return res.data;
    } catch (error) {
        toast.error('Failed to fetch chats');    
        return rejectWithValue(error.response.data);
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        users:[],
        chats:[],
        isUserLoading: false,
        isChatLoading: false,
    },
    reducers: {
        setSelectedUser:(state, action)=>{
            state.selectedUser = action.payload;
        },
        addChat: (state, action) => {
            state.chats.push(action.payload);
        }
    },
    extraReducers:(builder) => {
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

      .addCase(getChats.pending, (state) => {
        state.isChatLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isChatLoading = false;
        state.messages = action.payload;
      })
      .addCase(getChats.rejected, (state) => {
        state.isChatLoading = false;
      })
    }
});

export const {setSelectedUser, addChat} = chatSlice.actions;

export default chatSlice.reducer;