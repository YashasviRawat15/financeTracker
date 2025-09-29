import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    deleteTransaction: (state, action) => {
      return state.filter((txn) => txn.id !== action.payload); 
    },
    clearTransactions: () => {
      return []; 
    },
  },
});

export const { addTransaction, deleteTransaction, clearTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
