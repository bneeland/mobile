import axios from "axios";

export const backend = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_BASE_URL,
});
