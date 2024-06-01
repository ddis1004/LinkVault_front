import axios from "axios";

const BASE_URL = "http://43.201.182.255:8080/api";

export default axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
