import { BASE_URL, loginApi } from "./Routes";
import axios from "axios";

const Payload = {
  username: "emilys",
  password: "emilyspass",
  expiresInMins: 30,
};

const URL = loginApi;

export const PostApi = async (Payload, URL) => {
    try {
        const response = await axios.post(URL, Payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Invalid credentials"
        );
    }
};


export const GetApi = async (URL, accessToken) => {
    try {
        const headers = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        const response = await axios.get(URL, {
            headers,
            withCredentials: !!accessToken,
        });

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch user"
        );
    }
};

