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
    setImageAvatar: (state, action) => {
      const {logged,user}=state
      user.image=action.payload
      state.user = {logged,...user};
    },
  },
});

export const { setAuth, setUser,setImageAvatar } = AuthSlice.actions;
export default AuthSlice.reducer;
