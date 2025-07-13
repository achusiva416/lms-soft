
import { createSlice } from '@reduxjs/toolkit';


const storedUser = localStorage.getItem('user');
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
    //   console.log(action)
      state.user = action.payload;
      console.log(state.user)
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    }

  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
