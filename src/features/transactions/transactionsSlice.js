import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage (if available)
const loadTransactions = () => {
  try {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

const saveTransactions = (transactions) => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: loadTransactions(),
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = {
        ...action.payload,
        id: action.payload.id || Date.now(),
      };
      state.push(newTransaction);
      saveTransactions(state);
    },    
    deleteTransaction: (state, action) => {
      const updated = state.filter((txn) => txn.id !== action.payload);
      saveTransactions(updated);
      return updated;
    },
    clearTransactions: () => {
      saveTransactions([]);
      return [];
    },
  },
});

export const { addTransaction, deleteTransaction, clearTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
