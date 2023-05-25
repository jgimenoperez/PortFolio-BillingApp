import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.logged = action.payload;
    },
    setErrorLogin: (state, action) => {
      state.logged = false;
      state.errorLogin=action.payload
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    setImageAvatar: (state, action) => {
      const {logged,user}=state
      user.image=action.payload
      state.user = {logged,...user};
    },
    UpatetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, getUser,setImageAvatar,setErrorLogin } = UserSlice.actions;
export default UserSlice.reducer;
