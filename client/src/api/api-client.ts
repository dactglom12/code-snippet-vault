import axios from "axios";

export const baseClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});
