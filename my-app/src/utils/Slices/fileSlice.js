import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fileUpload = createAsyncThunk(
  "upload/file-upload",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("expr");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/doc-upload`,
        formData,
        
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const uploadSlice = createSlice({
  name: "sender",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fileUpload.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fileUpload.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entities = action.payload;
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;
