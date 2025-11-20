import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: "",
    due_date: "",
    clientName: "",
    clientAddress: {
        country: "",
        street: "",
        city: ""
    },
    products: [{
        product_name: "",
        product_price: 0,
        count: 1,
        descount: 0,
        product_total_price: 0
    }],
    total_price: 0
};

export const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        updateInvoiceField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        updateClientName: (state, action) => {
            state.clientName = action.payload;
        },
        updateClientAddress: (state, action) => {
            const { field, value } = action.payload;
            state.clientAddress[field] = value;
        },
        addProduct: (state) => {
            state.products.push({
                product_name: "",
                product_price: 0,
                count: 1,
                descount: 0,
                product_total_price: 0
            })
        },
        updateProduct: (state, action) => {
            const { index, field, value } = action.payload;
            state.products[index][field] = value;
            // update row total
            const item = state.products[index];
            const price = item.product_price * item.count;
            item.product_total_price = item.descount
                ? price - price * (item.descount / 100)
                : price;
        },
        removeProduct: (state, action) => {
            state.products.splice(action.payload, 1);
        },
        calculateTotal: (state) => {
            state.total_price = state.products.reduce(
                (sum, item) => sum + item.product_total_price,
                0
            );
        },
        resetInvoice: () => initialState

    },
});
export const {
    updateInvoiceField,
    updateClientName,
    updateClientAddress,
    addProduct,
    updateProduct,
    removeProduct,
    resetInvoice,
    calculateTotal
} = invoiceSlice.actions;

export default invoiceSlice.reducer;