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
        },
        deleteInvoice:(state,action)=>{
            state.invoices= state.invoices.filter((invoice)=>{
                return invoice._id !== action.payload
            })
        }
    }
});
export const { setInvoices,deleteInvoice } = allInvoicesSlice.actions;
export default allInvoicesSlice.reducer;
