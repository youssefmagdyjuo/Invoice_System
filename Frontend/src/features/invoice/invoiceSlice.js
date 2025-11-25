import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: new Date().toISOString(),
    clientName: "",
    clientAddress: {
        country: "",
        street: "",
        city: ""
    },
    clientPhone: "",
    draft: false,
    products: [{
        product_name: "",
        product_price: 0,
        product_total_price: 0,
        count: 1,
        descount: 0
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
        updateClientPhone: (state, action) => {
            state.clientPhone = action.payload;
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
            if(state.products.length > 1){
                state.products.splice(action.payload, 1);
            }
        },
        calculateTotal: (state) => {
            state.total_price = state.products.reduce(
                (sum, item) => sum + item.product_total_price,
                0
            );
        },
        resetInvoice: () => initialState,

        draftToggle: (state) => {
            state.draft = !state.draft;
        }
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
    calculateTotal,
    draftToggle,
    updateClientPhone
} = invoiceSlice.actions;

export default invoiceSlice.reducer;