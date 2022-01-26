import axios from "axios";

const baseURL = "https://logly.us"

const axiosInstance = axios.create({
    baseURL: baseURL
});

export default axiosInstance