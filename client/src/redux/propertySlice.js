import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice =
  createSlice({
    name: "property",

    initialState,

    reducers: {
      propertyStart:
        (state) => {
          state.loading = true;
          state.error = null;
        },

      propertySuccess:
        (state, action) => {
          state.loading = false;
          state.properties =
            action.payload;
        },

      propertyFailure:
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        },
    },
  });

export const {
  propertyStart,
  propertySuccess,
  propertyFailure,
} = propertySlice.actions;

export default propertySlice.reducer;