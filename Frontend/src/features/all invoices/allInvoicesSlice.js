import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    invoices: [],
};
export const allInvoicesSlice = createSlice({   
    name: "allInvoices",
    initialState,
    reducers: {
        setInvoices: (state, action) => {
            state.invoices = action.payload;
        }   
    }
});
export const { setInvoices } = allInvoicesSlice.actions;
export default allInvoicesSlice.reducer;
