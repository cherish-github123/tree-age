import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  
  name: 'userId',
  initialState: { 
    value: 0
  },
  reducers: {
    setUserId: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
})

export const { setUserId } = counterSlice.actions;
export default counterSlice.reducer;