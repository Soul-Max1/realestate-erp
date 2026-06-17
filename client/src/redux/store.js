import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import agencyReducer from "./agencySlice";
import employeeReducer from "./employeeSlice";
import attendanceReducer from "./attendanceSlice";
import propertyReducer from "./propertySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    agency: agencyReducer,
    employee: employeeReducer,
    attendance:
      attendanceReducer,
    property:
      propertyReducer,
  },
});

export default store;