import { initialInvoices, initialClients, initialSettings } from "./mockData";

const INVOICES_KEY = "viteruca_invoices_data";
const CLIENTS_KEY = "viteruca_clients_data";
const SETTINGS_KEY = "viteruca_settings_data";
const COUNTER_KEY = "viteruca_invoice_counter";

export const StorageService = {
  // --- Initialize Storage ---
  init: () => {
    if (!localStorage.getItem(INVOICES_KEY)) {
      localStorage.setItem(INVOICES_KEY, JSON.stringify(initialInvoices));
    }
    if (!localStorage.getItem(CLIENTS_KEY)) {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(initialClients));
    }
    if (!localStorage.getItem(SETTINGS_KEY)) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialSettings));
    }
    if (!localStorage.getItem(COUNTER_KEY)) {
      localStorage.setItem(COUNTER_KEY, "9");
    }
  },

  // --- Invoices ---
  getInvoices: () => {
    StorageService.init();
    try {
      const data = localStorage.getItem(INVOICES_KEY);
      return data ? JSON.parse(data) : initialInvoices;
    } catch (e) {
      console.error("Failed to load invoices from localStorage", e);
      return initialInvoices;
    }
  },

  getInvoiceById: (id) => {
    const invoices = StorageService.getInvoices();
    return invoices.find((inv) => String(inv._id) === String(id)) || null;
  },

  createInvoice: (invoiceData) => {
    const invoices = StorageService.getInvoices();
    const nextNum = StorageService.getNextInvoiceNumber();
    
    // Ensure invoice number
    const invNumber = invoiceData.invoiceNumber || `INV-2025-${String(nextNum).padStart(3, "0")}`;
    
    const newInvoice = {
      ...invoiceData,
      _id: "inv-" + Date.now(),
      invoiceNumber: invNumber,
      status: invoiceData.draft ? "draft" : (invoiceData.status || "pending"),
      createdAt: invoiceData.date || new Date().toISOString()
    };

    invoices.unshift(newInvoice);
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
    StorageService.incrementCounter();
    return newInvoice;
  },

  updateInvoice: (id, updatedData) => {
    const invoices = StorageService.getInvoices();
    const index = invoices.findIndex((inv) => String(inv._id) === String(id));
    if (index === -1) return null;

    const existing = invoices[index];
    const updated = {
      ...existing,
      ...updatedData,
      _id: existing._id,
      status: updatedData.draft ? "draft" : (updatedData.status || existing.status || "pending")
    };

    invoices[index] = updated;
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
    return updated;
  },

  deleteInvoice: (id) => {
    const invoices = StorageService.getInvoices();
    const filtered = invoices.filter((inv) => String(inv._id) !== String(id));
    localStorage.setItem(INVOICES_KEY, JSON.stringify(filtered));
    return true;
  },

  // --- Clients ---
  getClients: () => {
    StorageService.init();
    try {
      const data = localStorage.getItem(CLIENTS_KEY);
      return data ? JSON.parse(data) : initialClients;
    } catch (e) {
      console.error("Failed to load clients from localStorage", e);
      return initialClients;
    }
  },

  getClientById: (id) => {
    const clients = StorageService.getClients();
    return clients.find((c) => String(c._id) === String(id)) || null;
  },

  createClient: (clientData) => {
    const clients = StorageService.getClients();
    const newClient = {
      ...clientData,
      _id: "client-" + Date.now(),
      status: clientData.status || "active",
      createdAt: new Date().toISOString()
    };
    clients.unshift(newClient);
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
    return newClient;
  },

  updateClient: (id, updatedData) => {
    const clients = StorageService.getClients();
    const index = clients.findIndex((c) => String(c._id) === String(id));
    if (index === -1) return null;

    clients[index] = {
      ...clients[index],
      ...updatedData,
      _id: clients[index]._id
    };
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
    return clients[index];
  },

  deleteClient: (id) => {
    const clients = StorageService.getClients();
    const filtered = clients.filter((c) => String(c._id) !== String(id));
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(filtered));
    return true;
  },

  // --- Settings ---
  getSettings: () => {
    StorageService.init();
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : initialSettings;
    } catch (e) {
      console.error("Failed to load settings from localStorage", e);
      return initialSettings;
    }
  },

  updateSettings: (newSettings) => {
    const current = StorageService.getSettings();
    const merged = { ...current, ...newSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  },

  // --- Counter ---
  getNextInvoiceNumber: () => {
    const count = localStorage.getItem(COUNTER_KEY) || "9";
    return parseInt(count, 10);
  },

  incrementCounter: () => {
    const current = StorageService.getNextInvoiceNumber();
    localStorage.setItem(COUNTER_KEY, String(current + 1));
  },

  // --- Reset All to Demo Data ---
  resetDemoData: () => {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(initialInvoices));
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(initialClients));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialSettings));
    localStorage.setItem(COUNTER_KEY, "9");
    return {
      invoices: initialInvoices,
      clients: initialClients,
      settings: initialSettings
    };
  },

  // --- Clear all data ---
  clearAll: () => {
    localStorage.setItem(INVOICES_KEY, JSON.stringify([]));
    localStorage.setItem(CLIENTS_KEY, JSON.stringify([]));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialSettings));
    localStorage.setItem(COUNTER_KEY, "1");
  }
};
