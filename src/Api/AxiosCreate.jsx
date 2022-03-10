import axios from "axios";

const baseURL = "http://3.17.109.96:5000/api"

// const baseURL = "http://logly.us/api"

const axiosInstance = axios.create({
    baseURL: baseURL
});

export default axiosInstance