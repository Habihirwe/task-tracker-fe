import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api/",
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

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 500) {
//       localStorage.removeItem("userToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
