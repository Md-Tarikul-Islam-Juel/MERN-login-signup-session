import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    auth: 'false'
  },
  reducers: {
    AuthenticationRedux(state, action) {
      state.auth = action.payload;
    }
  }
});
export const { AuthenticationRedux } = authSlice.actions;
export default authSlice.reducer;
