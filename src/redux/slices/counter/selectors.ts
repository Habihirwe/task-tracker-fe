import { ReduxState } from "../../store";

export const selectCounter = (state: ReduxState) => state.counter.value;
