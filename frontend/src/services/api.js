import axios from "axios";

const API = axios.create({
  baseURL: "https://resumepilot-ai-8y0f.onrender.com/api",
});

export default API;