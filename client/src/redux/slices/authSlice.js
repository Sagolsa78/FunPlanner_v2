import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios.js'

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue,dispatch }) => {
    try {   
        const response = await axiosInstance.get('/auth/check');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState:{
        authUser:null,
        isCheckingAuth: true,
        onlineUsers: []
    },
    reducers: {
        setOnlineUsers: (state, action) => {    
            state.onlineUsers = action.payload;

        }
    },
    extraReducers: (builder) => {   
        builder 
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })  
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckingAuth = false;
                state.authUser = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isCheckingAuth = false;
                state.authUser = null;
            });
    }
})

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;