import { createSlice } from "@reduxjs/toolkit";
// Function to add days to a given date
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
};
// import { useSelector } from "react-redux";
// const invoiceCounter = useSelector ((state) => state.invoiceCounter);
const initialState = {
    invoiceNumber: '',
    date: new Date().toISOString(),
    dueDate: addDays(new Date().toISOString(), 7),
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
        setFullInvoice: (state, action) => {
            const invoice = action.payload;
            return {
                ...state,
                ...invoice,
                clientAddress: {
                    ...state.clientAddress,
                    ...invoice.clientAddress
                },
                products: invoice.products ? [...invoice.products] : state.products
            };
        }
        ,
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
            if (state.products.length > 1) {
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
        },
        setInvoiceNumber : (state,action)=>{
            state.invoiceNumber = action.payload
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
    updateClientPhone,
    setFullInvoice,
    setInvoiceNumber
} = invoiceSlice.actions;

export default invoiceSlice.reducer;