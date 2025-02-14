import { configureStore } from "@reduxjs/toolkit";
import accommodationReducer from "./reducers/accommodationSlice";

const store = configureStore({
  reducer: {
    accommodations: accommodationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
