import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getData = createAsyncThunk(
  "data/get-data",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("expr");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-data`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
