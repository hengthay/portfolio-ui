import axios from "axios";

const API = 'http://localhost:8000';

const API_BASE_URL = `${API}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'applicatin/json'
  }
})

export {API_BASE_URL, axiosInstance};