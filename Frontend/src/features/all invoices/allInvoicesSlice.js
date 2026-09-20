import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  loading: false,
  error: null
};

export const allInvoicesSlice = createSlice({
  name: "allInvoices",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload || [];
    },
    addInvoiceToStore: (state, action) => {
      state.invoices.unshift(action.payload);
    },
    updateInvoiceInStore: (state, action) => {
      const index = state.invoices.findIndex(
        (inv) => String(inv._id) === String(action.payload._id)
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => {
        return String(invoice._id) !== String(action.payload);
      });
    }
  }
});

export const { setInvoices, addInvoiceToStore, updateInvoiceInStore, deleteInvoice } =
  allInvoicesSlice.actions;
export default allInvoicesSlice.reducer;
