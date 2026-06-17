import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",

  initialState,

  reducers: {
    employeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    employeeSuccess: (
      state,
      action
    ) => {
      state.loading = false;
      state.employees =
        action.payload;
    },

    employeeFailure: (
      state,
      action
    ) => {
      state.loading = false;
      state.error =
        action.payload;
    },
  },
});

export const {
  employeeStart,
  employeeSuccess,
  employeeFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;