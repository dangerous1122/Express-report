// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming axios for HTTP requests

const initialState = {
  user: null,
  token: localStorage.getItem("expr"), // Add a token field to the initial state
  isLoading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        userData
      );
      // Assuming the response includes user data and a token
      return response.data; // This should include both the user and the token
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const validateUser = createAsyncThunk(
  "auth/validateUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("expr");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/validate`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data : { error: "Failed to validate user" }
      );
    }
  }
);
export const validateGoogle = createAsyncThunk(
  "auth/validateUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/google-auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: token,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data : { error: "Failed to validate user" }
      );
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        userData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to manually log out the user
    logoutUser(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Adjust according to your API response structure
        state.token = action.payload.token;
        localStorage.setItem("expr", action.payload.token); // Save the token
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Adjust according to your API response structure
        state.token = action.payload.token;
        localStorage.setItem("expr", action.payload.token); // Save the token
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
