import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../features/invoice/invoiceSlice";
import allInvoicesReducer from "../features/all invoices/allInvoicesSlice";
import invoiceCounterReducer from "../features/invoice/invoiceCounter"
export const store = configureStore({
    reducer: {
        invoice: invoiceReducer ,
        allInvoices: allInvoicesReducer,
        invoiceCounter:invoiceCounterReducer
    },
    
});