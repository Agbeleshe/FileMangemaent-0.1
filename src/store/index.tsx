import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { searchReducer } from "./search";
import tabReducer from "./tab-slice"; // Import the tab reducer

import { setActiveTabLabel } from './tab-slice';
import selectedLinkKeyReducer from './selectedLinkKeySlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    tab: tabReducer,
    selectedLinkKey: selectedLinkKeyReducer, // Add the tab reducer
    // Add other reducers if needed
  },
});

// Dispatch an action to set the activeTabLabel to "Paperlink" initially
store.dispatch(setActiveTabLabel("Paperlink"));

export type RootState = ReturnType<typeof store.getState>; // Define RootState type

export { store };
