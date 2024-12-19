import axios from "axios";
import { BASE_URL } from "./api";

const token = localStorage.getItem("token");

const axiosConfiguration = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default axiosConfiguration;
