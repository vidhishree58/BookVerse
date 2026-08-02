import axios from "axios";

const API = axios.create({
  baseURL: "https://bookverse-backend-uqft.onrender.com/api",
});

export default API;