import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
  };

  export const ThemeSlice = createSlice({

    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
  })

    export const { setTheme } = ThemeSlice.actions;
    export default ThemeSlice.reducer;
