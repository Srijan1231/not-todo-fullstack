import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/taskSlice.js";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
export default store;
