import { configureStore } from "@reduxjs/toolkit";

import poolSlice from "./slices/poolSlice";

const store = configureStore({
  reducer: {
    pools: poolSlice,
  },
});

export default store;
