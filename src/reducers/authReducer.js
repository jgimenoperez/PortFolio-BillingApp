import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged: false,
  };

  export const AuthSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.logged = action.payload;
        }
    }
  })

    export const { setAuth } = AuthSlice.actions;
    export default AuthSlice.reducer;
