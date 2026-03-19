import axios from "axios";

const API = axios.create({
  baseURL: "https://certificate-backend-mblv.onrender.com"
});

export default API;