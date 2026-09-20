import { createSlice } from "@reduxjs/toolkit";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

const initialState = {
  invoiceNumber: "",
  clientId: "",
  date: new Date().toISOString(),
  dueDate: addDays(new Date().toISOString(), 14),
  clientName: "",
  clientAddress: {
    country: "",
    street: "",
    city: ""
  },
  clientPhone: "",
  status: "pending",
  draft: false,
  products: [
    {
      product_name: "",
      product_price: 0,
      product_total_price: 0,
      count: 1,
      descount: 0
    }
  ],
  total_price: 0
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setFullInvoice: (state, action) => {
      const invoice = action.payload;
      if (!invoice) return state;
      return {
        ...state,
        ...invoice,
        clientAddress: {
          ...state.clientAddress,
          ...(invoice.clientAddress || {})
        },
        products: invoice.products ? invoice.products.map(p => ({
          ...p,
          descount: p.descount ?? p.discount ?? 0
        })) : state.products,
        status: invoice.status || (invoice.draft ? "draft" : "pending")
      };
    },
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
    setClientDetails: (state, action) => {
      const client = action.payload;
      state.clientId = client._id || "";
      state.clientName = client.name || "";
      state.clientPhone = client.phone || "";
      state.clientAddress = {
        country: client.country || "",
        city: client.city || "",
        street: client.street || ""
      };
    },
    addProduct: (state) => {
      state.products.push({
        product_name: "",
        product_price: 0,
        count: 1,
        descount: 0,
        product_total_price: 0
      });
    },
    updateProduct: (state, action) => {
      const { index, field, value } = action.payload;
      if (!state.products[index]) return;

      const normalizedField = field === "discount" ? "descount" : field;
      state.products[index][normalizedField] = value;

      const item = state.products[index];
      const count = Number(item.count) || 0;
      const price = Number(item.product_price) || 0;
      const discount = Number(item.descount) || 0;
      const gross = price * count;

      item.product_total_price = discount > 0 ? gross - gross * (discount / 100) : gross;
      item.product_total_price = Math.max(0, Math.round(item.product_total_price * 100) / 100);
    },
    removeProduct: (state, action) => {
      if (state.products.length > 1) {
        state.products.splice(action.payload, 1);
      }
    },
    calculateTotal: (state) => {
      state.total_price = state.products.reduce(
        (sum, item) => sum + (Number(item.product_total_price) || 0),
        0
      );
      state.total_price = Math.round(state.total_price * 100) / 100;
    },
    resetInvoice: () => initialState,
    draftToggle: (state) => {
      state.draft = !state.draft;
      state.status = state.draft ? "draft" : "pending";
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.draft = action.payload === "draft";
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    }
  }
});

export const {
  updateInvoiceField,
  updateClientName,
  updateClientAddress,
  updateClientPhone,
  setClientDetails,
  addProduct,
  updateProduct,
  removeProduct,
  resetInvoice,
  calculateTotal,
  draftToggle,
  setStatus,
  setFullInvoice,
  setInvoiceNumber
} = invoiceSlice.actions;

export default invoiceSlice.reducer;