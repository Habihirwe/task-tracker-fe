import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://task-tracker-vecp.onrender.com/api",
});

axiosInstance.interceptors.request.use(
  (request) => {
    const localData = localStorage.getItem("userToken");
    if (localData && localData !== "undefined") {
      request.headers.authorization = `${"Bearer" + " "}${JSON.parse(
        localData
      )}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
