import axios from "axios";

export const baseClient = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});
