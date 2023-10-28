import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    activeTabLabel: '',
  },
  reducers: {
    setActiveTabLabel: (state, action) => {
      state.activeTabLabel = action.payload;
    },
  },
});

export const { setActiveTabLabel } = tabSlice.actions;
export const selectActiveTabLabel = (state) => state.tab.activeTabLabel;
export default tabSlice.reducer;
