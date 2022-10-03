import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authReducer/authReducer';
import usernameReducer from '../Reducers/usernameReducer/usernameReducer';

export default configureStore({
  reducer: {
    authentication: authReducer,
    username: usernameReducer
  }
});
