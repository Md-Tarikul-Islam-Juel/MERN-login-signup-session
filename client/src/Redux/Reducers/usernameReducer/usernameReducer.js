import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({
  name: 'authentiucation',
  initialState: {
    username: null
  },
  reducers: {
    usernameRedux(state, action) {
      state.username = action.payload;
    }
  }
});
export const { usernameRedux } = usernameSlice.actions;
export default usernameSlice.reducer;
