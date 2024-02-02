import { createSlice } from "@reduxjs/toolkit";
import { login, registerUser } from ".";

const initialState: UserState = {
  data: {},
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.data = {};
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.data = {};
        state.error = action.error;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.data = {};
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.data = {};
        state.error = action.error;
      });
  },
});

interface UserState {
  data: any;
  error: any;
}
