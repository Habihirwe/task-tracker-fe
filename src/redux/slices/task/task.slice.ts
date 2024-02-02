import { createSlice } from "@reduxjs/toolkit";
import {
  createSubTask,
  createTask,
  fetckTask,
  fetckTasks,
  updateSubTask,
  updateTask,
} from ".";

const initialState: TaskState = {
  data: {},
  value: null,
  pending: false,
  error: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetckTasks.pending, (state) => {
        state.data = {};
        state.error = null;
        state.pending = true;
      })
      .addCase(fetckTasks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.pending = false;
      })
      .addCase(fetckTasks.rejected, (state, action) => {
        state.data = {};
        state.error = action.error;
        state.pending = false;
      });

    builder
      .addCase(fetckTask.pending, (state) => {
        state.value = {};
        state.error = null;
        state.pending = true;
      })
      .addCase(fetckTask.fulfilled, (state, action) => {
        state.value = action.payload;
        state.error = null;
        state.pending = false;
      })
      .addCase(fetckTask.rejected, (state, action) => {
        state.value = {};
        state.error = action.error;
        state.pending = false;
      });

    builder
      .addCase(createTask.pending, (state) => {
        state.value = {};
        state.error = null;
        state.pending = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.value = action.payload;
        state.error = null;
        state.pending = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.value = {};
        state.error = action.error;
        state.pending = false;
      });

    builder
      .addCase(createSubTask.pending, (state) => {
        state.value = {};
        state.error = null;
        state.pending = true;
      })
      .addCase(createSubTask.fulfilled, (state, action) => {
        state.value = action.payload;
        state.error = null;
        state.pending = false;
      })
      .addCase(createSubTask.rejected, (state, action) => {
        state.value = {};
        state.error = action.error;
        state.pending = false;
      });

    builder
      .addCase(updateSubTask.pending, (state) => {
        state.value = {};
        state.error = null;
        state.pending = true;
      })
      .addCase(updateSubTask.fulfilled, (state, action) => {
        state.value = action.payload;
        state.error = null;
        state.pending = false;
      })
      .addCase(updateSubTask.rejected, (state, action) => {
        state.value = {};
        state.error = action.error;
        state.pending = false;
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.value = {};
        state.error = null;
        state.pending = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.value = action.payload;
        state.error = null;
        state.pending = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.value = {};
        state.error = action.error;
        state.pending = false;
      });
  },
});

interface TaskState {
  data: any;
  value: any;
  pending: boolean;
  error: any;
}
