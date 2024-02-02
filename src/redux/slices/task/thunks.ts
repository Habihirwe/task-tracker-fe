import axios from "../../../config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetckTasks = createAppAsyncThunk("task/fetch", async () => {
  try {
    const response = await axios.get("/getalltasks");
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const fetckTask = createAppAsyncThunk(
  "task/fetchOne",
  async (id: string) => {
    try {
      const response = await axios.get(`/getsingletask/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const createTask = createAppAsyncThunk(
  "task/create",
  async (data: any) => {
    try {
      const response = await axios.post("/createtask", data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const createSubTask = createAppAsyncThunk(
  "task/sub/create",
  async (values: any) => {
    try {
      const { id, data } = values;
      const response = await axios.post(`/createsubtask/${id}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const updateTask = createAppAsyncThunk(
  "task/update",
  async (values: any) => {
    try {
      const { id, data } = values;
      const response = await axios.put(`/updatetaskstatus/${id}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const updateSubTask = createAppAsyncThunk(
  "task/sub/update",
  async (values: any) => {
    try {
      const { id, data } = values;
      const response = await axios.put(`/subtaskstatus/${id}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
