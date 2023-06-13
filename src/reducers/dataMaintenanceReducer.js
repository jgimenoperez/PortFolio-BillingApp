import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataMaintenance: {},
};

export const DataMaintenance = createSlice({
  name: "dataMaintenance",
  initialState,
  reducers: {
    setDataMaintenance: (state, action) => {
      state.dataMaintenance = action.payload;
    },
  },
});

export const { setDataMaintenance } = DataMaintenance.actions;
export default DataMaintenance.reducer;
