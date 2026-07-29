import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const makeThunkFactory = (method) => (first, second, third) => {
  if (first && typeof first === "object" && "name" in first && "url" in first) {
    const { name, url } = first;
    return createAsyncThunk(name, async (payload, thunkApi) => {
      try {
        const headers = { "Content-Type": "application/json" };
        let response;
        if (method === "post") {
          response = await axios.post(url, payload, { headers });
        } else {
          response = await axios.get(url, { headers });
        }
        return response.data;
      } catch (error) {
        const msg = error.response?.data?.message || "Request failed";
        return thunkApi.rejectWithValue(msg);
      }
    });
  }

  if (method === "post") {
    const payload = first;
    const url = second;
    const accessToken = third;
    return (async () => {
      const headers = { "Content-Type": "application/json" };
      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
      try {
        const response = await axios.post(url, payload, { headers });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Request failed"
        );
      }
    })();
  }

  const url = first;
  const accessToken = second;
  return (async () => {
    const headers = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    try {
      const response = await axios.get(url, {
        headers,
        withCredentials: !!accessToken,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch"
      );
    }
  })();
};

export const PostApi = makeThunkFactory("post");
export const GetApi = makeThunkFactory("get");
