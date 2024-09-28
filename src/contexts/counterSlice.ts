import { createSlice } from "@reduxjs/toolkit";
import { IData } from "../pages/Home";

interface CounterState {
  myPet: IData[];
}

const initialState: CounterState = {
  myPet: [],
};

export const counterSlice = createSlice({
  name: "myPet",
  initialState,
  reducers: {
    updateMyPet: (state, action) => {
      state.myPet = action.payload;
    },
  },
});

export const { updateMyPet } = counterSlice.actions;

export default counterSlice.reducer;
