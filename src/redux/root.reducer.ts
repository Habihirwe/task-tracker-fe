import { counterSlice } from "./slices/counter/counter.slice";
import { taskSlice } from "./slices/task";
import { userSlice } from "./slices/user";

export const reducer = {
  counter: counterSlice.reducer,
  user: userSlice.reducer,
  task: taskSlice.reducer,
};
