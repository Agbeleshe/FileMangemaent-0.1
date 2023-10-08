// errorActions.ts

// Action Types
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Action Creators
export const setError = (message: string) => ({
  type: SET_ERROR,
  payload: message,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
