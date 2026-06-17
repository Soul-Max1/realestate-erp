import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agencies: [],
  loading: false,
  error: null,
};

const agencySlice = createSlice({
  name: "agency",

  initialState,

  reducers: {
    agencyStart: (state) => {
      state.loading = true;
    },

    agencySuccess: (state, action) => {
      state.loading = false;
      state.agencies = action.payload;
    },

    agencyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  agencyStart,
  agencySuccess,
  agencyFailure,
} = agencySlice.actions;

export default agencySlice.reducer;