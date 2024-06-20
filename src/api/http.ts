import axios from "axios";

export const baseUrl = "http://119.235.112.154:3003/api/v1";

export const http = axios.create({
  baseURL: baseUrl,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
  },
});
