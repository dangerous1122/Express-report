// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import senderSlice from './Slices/senderSlice';
import  fileUpload  from './Slices/fileSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sender:senderSlice,
    file:fileUpload,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});
