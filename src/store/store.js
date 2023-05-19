import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import themeReducer from "../reducers/themeReducer";
import { customMiddleware } from "../middelware/middelware";

const logger = createLogger();

export default configureStore({
    reducer: {
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, customMiddleware, thunkMiddleware),
  
  });