import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: [],
  loading: false,
  error: null,
};

const attendanceSlice =
  createSlice({
    name: "attendance",

    initialState,

    reducers: {
      attendanceStart:
        (state) => {
          state.loading = true;
          state.error = null;
        },

      attendanceSuccess:
        (state, action) => {
          state.loading = false;
          state.attendance =
            action.payload;
        },

      attendanceFailure:
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        },
    },
  });

export const {
  attendanceStart,
  attendanceSuccess,
  attendanceFailure,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;