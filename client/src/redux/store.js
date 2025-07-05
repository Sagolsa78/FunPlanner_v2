import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import todoReducer from './slices/todoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    todos: todoReducer,
  },
});

export default store;
