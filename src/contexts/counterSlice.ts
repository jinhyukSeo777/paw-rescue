import { createSlice } from "@reduxjs/toolkit";
import { IData } from "../pages/Home";

interface CounterState {
  myPet: IData[]; //좋아요 동물 목록
  matchResult: IData[];
}

const initialState: CounterState = {
  myPet: [],
  matchResult: [],
};

export const counterSlice = createSlice({
  name: "myPet",
  initialState,
  reducers: {
    updateMyPet: (state, action) => {
      state.myPet = action.payload;
    },
    updateMatchResult: (state, action) => {
      state.matchResult = action.payload;
    },
  },
});

export const { updateMyPet, updateMatchResult } = counterSlice.actions;

export default counterSlice.reducer;
