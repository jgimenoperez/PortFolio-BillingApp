import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { customMiddleware } from "../middelware/middelware";
import authReducer from "../reducers/authReducer";
import themeReducer from "../reducers/themeReducer";
import thunkMiddleware from "redux-thunk";

const logger = createLogger();

export default configureStore({
    reducer: {
      theme: themeReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, customMiddleware, thunkMiddleware),
  
  });