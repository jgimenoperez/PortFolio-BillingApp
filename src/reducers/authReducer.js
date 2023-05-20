import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged: false,
    user: null,
  };

  export const AuthSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.logged = action.payload;
        },
        setUser: (state, action) => {
          state.user = action.payload;
      },
    }
  })

    export const { setAuth,setUser } = AuthSlice.actions;
    export default AuthSlice.reducer;
