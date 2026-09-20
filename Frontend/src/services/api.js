import { StorageService } from "./storage";

// Unified API Service for the frontend
// Fully client-side standalone demo mode with localStorage persistence
export const api = {
  // Invoices
  getInvoices: async () => {
    return StorageService.getInvoices();
  },

  getInvoiceById: async (id) => {
    return StorageService.getInvoiceById(id);
  },

  createInvoice: async (invoiceData) => {
    return StorageService.createInvoice(invoiceData);
  },

  updateInvoice: async (id, invoiceData) => {
    return StorageService.updateInvoice(id, invoiceData);
  },

  deleteInvoice: async (id) => {
    return StorageService.deleteInvoice(id);
  },

  // Clients
  getClients: async () => {
    return StorageService.getClients();
  },

  getClientById: async (id) => {
    return StorageService.getClientById(id);
  },

  createClient: async (clientData) => {
    return StorageService.createClient(clientData);
  },

  updateClient: async (id, clientData) => {
    return StorageService.updateClient(id, clientData);
  },

  deleteClient: async (id) => {
    return StorageService.deleteClient(id);
  },

  // Settings
  getSettings: async () => {
    return StorageService.getSettings();
  },

  updateSettings: async (settingsData) => {
    return StorageService.updateSettings(settingsData);
  },

  // Reset demo
  resetDemoData: async () => {
    return StorageService.resetDemoData();
  },

  clearAll: async () => {
    return StorageService.clearAll();
  }
};
