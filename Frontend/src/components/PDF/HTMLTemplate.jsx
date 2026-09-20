import React from "react";
import { StorageService } from "../../services/storage";

export default function HTMLTemplate({ invoice }) {
  if (!invoice) return null;

  const settings = StorageService.getSettings();
  const currency = settings.currency || "$";

  const invoiceNum = invoice.invoiceNumber || "INV-DRAFT";
  const invoiceDate = invoice.date ? invoice.date.split("T")[0] : new Date().toISOString().split("T")[0];
  const dueDate = invoice.dueDate ? invoice.dueDate.split("T")[0] : "Upon Receipt";
  const clientName = invoice.clientName || "Valued Client";
  const clientStreet = invoice.clientAddress?.street || "";
  const clientCity = invoice.clientAddress?.city || "";
  const clientCountry = invoice.clientAddress?.country || "";
  const clientPhone = invoice.clientPhone || "";
  const products = invoice.products || [];
  const totalPrice = invoice.total_price || 0;

  return (
    <div className="invoice-print-container">
      <style>{`
        @page {
          size: A4;
          margin: 15mm;
        }

        @media print {
          body {
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-print-container {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }

        .invoice-print-container {
          max-width: 800px;
          margin: 20px auto;
          background: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #2d3748;
          line-height: 1.5;
        }

        .inv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 25px;
          margin-bottom: 30px;
        }

        .inv-brand-title {
          font-size: 24px;
          font-weight: 800;
          color: #0891b2;
          letter-spacing: -0.5px;
          margin: 0 0 6px 0;
        }

        .inv-brand-sub {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .inv-meta-right {
          text-align: right;
        }

        .inv-badge-title {
          font-size: 28px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .inv-meta-line {
          font-size: 13px;
          color: #475569;
          margin: 2px 0;
        }

        .inv-parties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 35px;
        }

        .inv-party-card {
          background: #f8fafc;
          padding: 16px 20px;
          border-radius: 6px;
          border-left: 4px solid #0891b2;
        }

        .inv-party-title {
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .inv-party-name {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .inv-party-desc {
          font-size: 13px;
          color: #475569;
          margin: 2px 0;
        }

        .inv-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
        }

        .inv-table th {
          background: #0f172a;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 12px 14px;
          text-align: left;
        }

        .inv-table th:last-child,
        .inv-table td:last-child {
          text-align: right;
        }

        .inv-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 13px;
          color: #334155;
        }

        .inv-table tbody tr:nth-child(even) {
          background: #f8fafc;
        }

        .inv-summary-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
          margin-bottom: 35px;
        }

        .inv-summary-table {
          width: 280px;
          border-collapse: collapse;
        }

        .inv-summary-table td {
          padding: 8px 12px;
          font-size: 13px;
        }

        .inv-total-row {
          background: #0891b2;
          color: #ffffff;
          font-weight: 700;
          font-size: 16px !important;
          border-radius: 4px;
        }

        .inv-total-row td {
          color: #ffffff;
          padding: 12px;
        }

        .inv-footer {
          border-top: 1px dashed #cbd5e1;
          padding-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
      `}</style>

      {/* Action bar when viewed on screen */}
      <div className="no-print flex justify-between items-center bg-gray-50 border border-gray-200 rounded p-3 mb-6">
        <div>
          <span className="font-semibold text-gray-700 text-sm">Invoice Preview Mode</span>
          <span className="text-xs text-gray-500 block">Print to physical printer or save directly as PDF</span>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm px-4 py-2 rounded flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <i className="fa-solid fa-print"></i> Print / Save as PDF
        </button>
      </div>

      <div className="inv-header">
        <div>
          <h1 className="inv-brand-title">{settings.companyName || "Viteruca Solutions Ltd."}</h1>
          <p className="inv-brand-sub">{settings.tagline || "Professional Invoicing & Tech Services"}</p>
          <p className="inv-brand-sub">
            {settings.street}, {settings.city}, {settings.country}
          </p>
          <p className="inv-brand-sub">
            Email: {settings.email} | Tel: {settings.phone}
          </p>
        </div>

        <div className="inv-meta-right">
          <h2 className="inv-badge-title">INVOICE</h2>
          <p className="inv-meta-line">
            <strong>Invoice No:</strong> {invoiceNum}
          </p>
          <p className="inv-meta-line">
            <strong>Issue Date:</strong> {invoiceDate}
          </p>
          <p className="inv-meta-line">
            <strong>Due Date:</strong> {dueDate}
          </p>
          <p className="inv-meta-line">
            <strong>Status:</strong>{" "}
            <span
              style={{
                textTransform: "uppercase",
                fontWeight: 700,
                color:
                  invoice.status === "paid"
                    ? "#059669"
                    : invoice.status === "overdue"
                    ? "#dc2626"
                    : "#d97706"
              }}
            >
              {invoice.status || (invoice.draft ? "draft" : "pending")}
            </span>
          </p>
        </div>
      </div>

      <div className="inv-parties">
        <div className="inv-party-card">
          <div className="inv-party-title">Billed To</div>
          <div className="inv-party-name">{clientName}</div>
          {clientStreet && <div className="inv-party-desc">{clientStreet}</div>}
          {(clientCity || clientCountry) && (
            <div className="inv-party-desc">
              {[clientCity, clientCountry].filter(Boolean).join(", ")}
            </div>
          )}
          {clientPhone && <div className="inv-party-desc">Phone: {clientPhone}</div>}
        </div>

        <div className="inv-party-card">
          <div className="inv-party-title">Payment Instructions</div>
          <div className="inv-party-desc">
            <strong>Tax / VAT ID:</strong> {settings.taxNumber || "N/A"}
          </div>
          <div className="inv-party-desc">
            <strong>Terms:</strong> Payment due within 14 days
          </div>
          <div className="inv-party-desc">
            <strong>Accepted Methods:</strong> Bank Wire, Stripe, Credit Card
          </div>
        </div>
      </div>

      <table className="inv-table">
        <thead>
          <tr>
            <th style={{ width: "45%" }}>Description</th>
            <th style={{ textAlign: "center" }}>Qty</th>
            <th style={{ textAlign: "right" }}>Unit Price</th>
            <th style={{ textAlign: "center" }}>Discount</th>
            <th style={{ textAlign: "right" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>
                <strong>{item.product_name || "Item / Service"}</strong>
              </td>
              <td style={{ textAlign: "center" }}>{item.count}</td>
              <td style={{ textAlign: "right" }}>
                {currency}
                {Number(item.product_price || 0).toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                {item.descount || item.discount ? `${item.descount || item.discount}%` : "—"}
              </td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>
                {currency}
                {Number(item.product_total_price || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="inv-summary-wrap">
        <table className="inv-summary-table">
          <tbody>
            <tr>
              <td style={{ color: "#64748b" }}>Subtotal:</td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>
                {currency}
                {Number(totalPrice).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style={{ color: "#64748b" }}>Tax / VAT (0%):</td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>{currency}0.00</td>
            </tr>
            <tr className="inv-total-row">
              <td>Total Due:</td>
              <td style={{ textAlign: "right" }}>
                {currency}
                {Number(totalPrice).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="inv-footer">
        <p style={{ margin: "0 0 6px 0", fontWeight: 600, color: "#334155" }}>
          {settings.notes || "Thank you for your business!"}
        </p>
        <p style={{ margin: 0 }}>
          Generated by {settings.companyName || "Viteruca Solutions"} Invoice System &bull; All rights reserved.
        </p>
      </div>
    </div>
  );
}
