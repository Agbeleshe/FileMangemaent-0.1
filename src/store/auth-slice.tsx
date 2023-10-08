import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userEmail: localStorage.getItem('userEmail') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userEmail = action.payload;
      localStorage.setItem('userEmail', action.payload); // Store the user's email in local storage
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userEmail = null;
      localStorage.removeItem('userEmail'); // Remove the userEmail from local storage when logging out
    },
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
export const { login, logout } = authActions;
