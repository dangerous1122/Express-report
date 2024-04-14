import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL; // Adjust this to your actual API base URL

// Async thunk for fetching sender and receiver data
export const fetchSenders = createAsyncThunk(
  "contacts/get-senders",
  async (add, { rejectWithValue }) => {
    const token = localStorage.getItem("expr");
    try {
      const response = await axios.get(`${baseUrl}/get-senders/${add}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for adding a new contact (either sender or receiver)
export const addSender = createAsyncThunk(
  "contacts/add-sender",
  async (contactData, { rejectWithValue }) => {
    const token = localStorage.getItem("expr");
    try {
      const response = await axios.post(`${baseUrl}/add-sender`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for editing a contact
export const editSenders = createAsyncThunk(
  "contacts/edit-sender",
  async ({ id, data }, { rejectWithValue }) => {
    const token = localStorage.getItem("expr");
    try {
      const response = await axios.patch(`${baseUrl}/edit-sender/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for deleting a contact
export const deleteSenders = createAsyncThunk(
  "contacts/delete-sender",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("expr");
    try {
      await axios.delete(`${baseUrl}/delete-sender/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Contacts slice
const contactsSlice = createSlice({
  name: "sender",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSenders.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSenders.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entities = action.payload;
      })
      .addCase(fetchSenders.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      })
      .addCase(addSender.fulfilled, (state, action) => {
        // state.entities.push(action.payload);
      })
      .addCase(editSenders.fulfilled, (state, action) => {
        console.log('s,',action.payload)
        state.entities=action.payload
   
      })
      .addCase(deleteSenders.fulfilled, (state, action) => {
 
      });
  },
});

export default contactsSlice.reducer;
