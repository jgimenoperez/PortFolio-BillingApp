import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { customMiddleware } from "../middelware/middelware";
import userReducer from "../reducers/userReducer";
import themeReducer from "../reducers/themeReducer";
import dataMaintenanceReducer from "../reducers/dataMaintenanceReducer";

import thunkMiddleware from "redux-thunk";

const logger = createLogger();

export default configureStore({
    reducer: {
      theme: themeReducer,
      user: userReducer,
      data:dataMaintenanceReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat( customMiddleware, thunkMiddleware),
  
  });