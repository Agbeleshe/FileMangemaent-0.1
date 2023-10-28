// selectedLinkKeySlice.js

import { createSlice } from "@reduxjs/toolkit";

const selectedLinkKeySlice = createSlice({
  name: "selectedLinkKey",
  initialState: {
    selectedLinkKey: "",
  },
  reducers: {
    setSelectedLinkKey: (state, action) => {
      state.selectedLinkKey = action.payload;
    },
  },
});

export const { setSelectedLinkKey } = selectedLinkKeySlice.actions;

// Define a selector to access the selectedLinkKey value
export const selectSelectedLinkKey = (state) => state.selectedLinkKey.selectedLinkKey;

export default selectedLinkKeySlice.reducer;
