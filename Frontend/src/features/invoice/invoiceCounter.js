// invoiceCounterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const invoiceCounterSlice = createSlice({
    name: "invoiceCounter",
    initialState: {
        lastNumber: 1, 
    },
    reducers: {
        incrementInvoice(state) {
            state.lastNumber += 1;
        },
        resetInvoiceNumber(state) {
            state.lastNumber = 0;
        }
    }
});

export const { incrementInvoice, resetInvoiceNumber } = invoiceCounterSlice.actions;
export default invoiceCounterSlice.reducer;
