import { createSlice } from '@reduxjs/toolkit';

const identifierSlice = createSlice({
  name: 'identifier',
  initialState: { value: "" },
  reducers: {
    setIdentifier: (state, action) => { state.value = action.payload },
  }
});

export const { setIdentifier } = identifierSlice.actions;
export default identifierSlice.reducer;
