// store/registrationSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  identifier: "",       // email or phone
  dob: "",              // date of birth
  formData: {},         // complete registration form
  isAuthenticated: false, // tracks if user is logged in or verified
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setIdentifier: (state, action) => {
      state.identifier = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearRegistrationData: (state) => {
      state.identifier = "";
      state.dob = "";
      state.formData = {};
      state.isAuthenticated = false;
    },
  },
});

export const {
  setIdentifier,
  setDob,
  setFormData,
  setIsAuthenticated,
  clearRegistrationData,
} = registrationSlice.actions;

export default registrationSlice.reducer;
