import { createAction, createSlice } from '@reduxjs/toolkit';

interface searchState {
  isLoggedIn: boolean;
}

const search = createSlice({
  name: 'search',
  initialState: { isLoggedIn: false } as searchState, // Fix the initial state here
  reducers: {
    openSearch(state) {
      state.isLoggedIn = true; // Change 'search' to 'isLoggedIn' here
    },
    closeSearch(state) {
      state.isLoggedIn = false; // Change 'search' to 'isLoggedIn' here
    },
  },
});

export const { reducer: searchReducer, actions: searchActions } = search; // Fix the reducer and actions names
export const { openSearch, closeSearch } = searchActions;
export type { searchState };
