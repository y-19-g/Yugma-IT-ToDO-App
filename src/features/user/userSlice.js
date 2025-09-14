import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    isLoggedIn: false
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = null;
      state.isLoggedIn = false;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
