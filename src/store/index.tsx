import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth-slice';
import { searchReducer } from './search';

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState type

export { store };





