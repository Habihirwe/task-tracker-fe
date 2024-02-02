import { message } from "antd";
import axios from "../../../config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const login = createAppAsyncThunk("user/login", async (data: any) => {
  try {
    const response = await axios.post("/login", data);
    localStorage.setItem("userToken", JSON.stringify(response?.data?.token));
    return response;
  } catch (error: any) {
    message.error(error?.response?.data?.InvalidCredentials);
    throw new Error(error);
  }
});

export const registerUser = createAppAsyncThunk(
  "user/register",
  async (data: any) => {
    try {
      const response = await axios.post("/signup", data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
