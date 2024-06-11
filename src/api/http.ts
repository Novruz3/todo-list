import axios from "axios";

export const baseUrl = "http://119.235.112.154:3003/api/v1";
const token = localStorage.getItem("token")

export const http = axios.create({
  baseURL : baseUrl,
  timeout: 10000,
  headers:{
    "Content-Type" : "application/json",
    "Authorization": token ? `Bearer ${localStorage.getItem('token')}` : ""
  }
})