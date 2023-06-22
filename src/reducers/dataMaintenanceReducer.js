import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataMaintenance: {},
  currentCustomer:{}, 
  currentInvoice:{}
};

export const DataMaintenance = createSlice({
  name: "dataMaintenance",
  initialState,
  reducers: {
    setDataMaintenance: (state, action) => {
      state.dataMaintenance = action.payload;
    },
    setCurrenCustomer: (state, action) => {
      state.currentCustomer = action.payload;
    },
    upateCurrenCustomer: (state, action) => {
      const {currentCustomer}=state
      // console.log(action.payload)
      state.currentCustomer = {...currentCustomer,...action.payload};
    },
  },
});

export const { setDataMaintenance,setCurrenCustomer,upateCurrenCustomer } = DataMaintenance.actions;
export default DataMaintenance.reducer;
