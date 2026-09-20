export const initialSettings = {
  companyName: "Viteruca Solutions Ltd.",
  tagline: "Modern Invoicing & Financial Operations",
  email: "billing@viteruca.com",
  phone: "+20 128 628 9971",
  street: "45 El-Horreya Avenue, Suite 602",
  city: "Alexandria",
  country: "Egypt",
  website: "https://viteruca.com",
  taxNumber: "EG-TAX-98241084",
  currency: "$",
  defaultDueDays: 14,
  notes: "Payment is requested within the due date. Thank you for partnering with Viteruca Solutions!"
};

export const initialClients = [
  {
    _id: "client-1",
    name: "Acrobat Digital Agency",
    contactPerson: "Sarah Jenkins",
    email: "s.jenkins@acrobatagency.co",
    phone: "+1 (555) 234-5678",
    country: "United States",
    city: "San Francisco",
    street: "742 Market St, Floor 8",
    status: "active",
    createdAt: "2025-01-10T10:00:00.000Z"
  },
  {
    _id: "client-2",
    name: "Nordic Tech Solutions",
    contactPerson: "Erik Lindqvist",
    email: "erik@nordictech.se",
    phone: "+46 8 123 4567",
    country: "Sweden",
    city: "Stockholm",
    street: "Sveavagen 44",
    status: "active",
    createdAt: "2025-01-14T09:30:00.000Z"
  },
  {
    _id: "client-3",
    name: "Al-Ahram Logistics",
    contactPerson: "Tarek Mansour",
    email: "tarek@alahramlogistics.eg",
    phone: "+20 100 554 9912",
    country: "Egypt",
    city: "Cairo",
    street: "22 Nasr Road, Heliopolis",
    status: "active",
    createdAt: "2025-01-20T11:15:00.000Z"
  },
  {
    _id: "client-4",
    name: "Horizon Cloud Systems",
    contactPerson: "Elena Rostova",
    email: "elena@horizoncloud.de",
    phone: "+49 30 9876 543",
    country: "Germany",
    city: "Berlin",
    street: "Friedrichstraße 112",
    status: "active",
    createdAt: "2025-02-01T14:20:00.000Z"
  },
  {
    _id: "client-5",
    name: "Apex Retailers Group",
    contactPerson: "Michael Wong",
    email: "m.wong@apexretail.sg",
    phone: "+65 6789 0123",
    country: "Singapore",
    city: "Singapore",
    street: "10 Marina Boulevard, Tower 2",
    status: "active",
    createdAt: "2025-02-05T08:45:00.000Z"
  }
];

export const initialInvoices = [
  {
    _id: "inv-001",
    invoiceNumber: "INV-2025-001",
    clientId: "client-1",
    clientName: "Acrobat Digital Agency",
    clientPhone: "+1 (555) 234-5678",
    clientAddress: {
      country: "United States",
      city: "San Francisco",
      street: "742 Market St, Floor 8"
    },
    date: "2025-02-01T10:00:00.000Z",
    dueDate: "2025-02-15T10:00:00.000Z",
    status: "paid",
    draft: false,
    products: [
      {
        product_name: "Brand Identity Design & UI Kit",
        count: 1,
        product_price: 3200,
        descount: 5,
        product_total_price: 3040
      },
      {
        product_name: "Responsive Frontend Integration",
        count: 40,
        product_price: 65,
        descount: 0,
        product_total_price: 2600
      }
    ],
    total_price: 5640,
    createdAt: "2025-02-01T10:00:00.000Z"
  },
  {
    _id: "inv-002",
    invoiceNumber: "INV-2025-002",
    clientId: "client-2",
    clientName: "Nordic Tech Solutions",
    clientPhone: "+46 8 123 4567",
    clientAddress: {
      country: "Sweden",
      city: "Stockholm",
      street: "Sveavagen 44"
    },
    date: "2025-02-05T12:30:00.000Z",
    dueDate: "2025-02-19T12:30:00.000Z",
    status: "paid",
    draft: false,
    products: [
      {
        product_name: "Cloud Architecture Audit & Security Review",
        count: 1,
        product_price: 2400,
        descount: 0,
        product_total_price: 2400
      },
      {
        product_name: "Microservices Performance Optimization",
        count: 25,
        product_price: 80,
        descount: 10,
        product_total_price: 1800
      }
    ],
    total_price: 4200,
    createdAt: "2025-02-05T12:30:00.000Z"
  },
  {
    _id: "inv-003",
    invoiceNumber: "INV-2025-003",
    clientId: "client-3",
    clientName: "Al-Ahram Logistics",
    clientPhone: "+20 100 554 9912",
    clientAddress: {
      country: "Egypt",
      city: "Cairo",
      street: "22 Nasr Road, Heliopolis"
    },
    date: "2025-02-10T14:00:00.000Z",
    dueDate: "2025-02-24T14:00:00.000Z",
    status: "pending",
    draft: false,
    products: [
      {
        product_name: "Warehouse Inventory Tracking Dashboard",
        count: 1,
        product_price: 4500,
        descount: 0,
        product_total_price: 4500
      },
      {
        product_name: "Barcode Scanner API Integration",
        count: 1,
        product_price: 1200,
        descount: 0,
        product_total_price: 1200
      },
      {
        product_name: "Staff Onboarding & Training Session",
        count: 2,
        product_price: 350,
        descount: 20,
        product_total_price: 560
      }
    ],
    total_price: 6260,
    createdAt: "2025-02-10T14:00:00.000Z"
  },
  {
    _id: "inv-004",
    invoiceNumber: "INV-2025-004",
    clientId: "client-4",
    clientName: "Horizon Cloud Systems",
    clientPhone: "+49 30 9876 543",
    clientAddress: {
      country: "Germany",
      city: "Berlin",
      street: "Friedrichstraße 112"
    },
    date: "2025-01-15T09:00:00.000Z",
    dueDate: "2025-01-29T09:00:00.000Z",
    status: "overdue",
    draft: false,
    products: [
      {
        product_name: "Kubernetes Cluster Configuration",
        count: 1,
        product_price: 3800,
        descount: 0,
        product_total_price: 3800
      },
      {
        product_name: "SSL Certificate & CDN Migration",
        count: 1,
        product_price: 950,
        descount: 10,
        product_total_price: 855
      }
    ],
    total_price: 4655,
    createdAt: "2025-01-15T09:00:00.000Z"
  },
  {
    _id: "inv-005",
    invoiceNumber: "INV-2025-005",
    clientId: "client-5",
    clientName: "Apex Retailers Group",
    clientPhone: "+65 6789 0123",
    clientAddress: {
      country: "Singapore",
      city: "Singapore",
      street: "10 Marina Boulevard, Tower 2"
    },
    date: "2025-02-18T16:45:00.000Z",
    dueDate: "2025-03-04T16:45:00.000Z",
    status: "pending",
    draft: false,
    products: [
      {
        product_name: "E-Commerce Checkout Flow Redesign",
        count: 1,
        product_price: 5200,
        descount: 0,
        product_total_price: 5200
      },
      {
        product_name: "Stripe & Apple Pay Integration",
        count: 1,
        product_price: 1800,
        descount: 0,
        product_total_price: 1800
      }
    ],
    total_price: 7000,
    createdAt: "2025-02-18T16:45:00.000Z"
  },
  {
    _id: "inv-006",
    invoiceNumber: "INV-2025-006",
    clientId: "client-1",
    clientName: "Acrobat Digital Agency",
    clientPhone: "+1 (555) 234-5678",
    clientAddress: {
      country: "United States",
      city: "San Francisco",
      street: "742 Market St, Floor 8"
    },
    date: "2025-02-20T11:00:00.000Z",
    dueDate: "2025-03-06T11:00:00.000Z",
    status: "draft",
    draft: true,
    products: [
      {
        product_name: "Q1 Social Media Campaign Assets",
        count: 15,
        product_price: 120,
        descount: 0,
        product_total_price: 1800
      },
      {
        product_name: "Interactive Webflow Landing Page",
        count: 1,
        product_price: 2100,
        descount: 15,
        product_total_price: 1785
      }
    ],
    total_price: 3585,
    createdAt: "2025-02-20T11:00:00.000Z"
  },
  {
    _id: "inv-007",
    invoiceNumber: "INV-2025-007",
    clientId: "client-3",
    clientName: "Al-Ahram Logistics",
    clientPhone: "+20 100 554 9912",
    clientAddress: {
      country: "Egypt",
      city: "Cairo",
      street: "22 Nasr Road, Heliopolis"
    },
    date: "2025-01-05T08:00:00.000Z",
    dueDate: "2025-01-19T08:00:00.000Z",
    status: "paid",
    draft: false,
    products: [
      {
        product_name: "Fleet GPS Tracking API Setup",
        count: 1,
        product_price: 3200,
        descount: 0,
        product_total_price: 3200
      },
      {
        product_name: "Monthly Cloud Infrastructure Maintenance",
        count: 1,
        product_price: 800,
        descount: 0,
        product_total_price: 800
      }
    ],
    total_price: 4000,
    createdAt: "2025-01-05T08:00:00.000Z"
  },
  {
    _id: "inv-008",
    invoiceNumber: "INV-2025-008",
    clientId: "client-2",
    clientName: "Nordic Tech Solutions",
    clientPhone: "+46 8 123 4567",
    clientAddress: {
      country: "Sweden",
      city: "Stockholm",
      street: "Sveavagen 44"
    },
    date: "2025-02-22T13:10:00.000Z",
    dueDate: "2025-03-08T13:10:00.000Z",
    status: "pending",
    draft: false,
    products: [
      {
        product_name: "Real-time Analytics Dashboard Module",
        count: 1,
        product_price: 3600,
        descount: 0,
        product_total_price: 3600
      }
    ],
    total_price: 3600,
    createdAt: "2025-02-22T13:10:00.000Z"
  }
];
