import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  
  name: 'userName',
  initialState: { 
    value: 'admin'
  },
  reducers: {
    setUserName: (state: any, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
    
  }
})

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;