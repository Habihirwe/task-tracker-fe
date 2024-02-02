import { createSlice } from "@reduxjs/toolkit";

const initialState: CounterState = {
  value: 0,
  state: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

interface CounterState {
  value: number;
  state: "idle" | "loading" | "failed";
}
