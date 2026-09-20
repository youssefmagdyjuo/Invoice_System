import { StorageService } from "../services/storage";

export const generatePDF = (invoice) => {
  if (!invoice) return;

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
  const totalPrice = Number(invoice.total_price || 0).toFixed(2);

  const printWindow = window.open("", "_blank", "width=850,height=950");
  if (!printWindow) {
    alert("Please allow popups for this site to print or export invoices.");
    return;
  }

  const itemsHtml = products
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;">
          <strong>${item.product_name || "Item / Service"}</strong>
        </td>
        <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">
          ${item.count}
        </td>
        <td style="padding: 10px 12px; text-align: right; border-bottom: 1px solid #e2e8f0;">
          ${currency}${Number(item.product_price || 0).toFixed(2)}
        </td>
        <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">
          ${item.descount || item.discount ? (item.descount || item.discount) + "%" : "—"}
        </td>
        <td style="padding: 10px 12px; text-align: right; font-weight: 600; border-bottom: 1px solid #e2e8f0;">
          ${currency}${Number(item.product_total_price || 0).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${invoiceNum} - ${clientName}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 30px;
            background: #fff;
          }
          .invoice-box {
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #0891b2;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }
          .brand-title {
            font-size: 24px;
            font-weight: 800;
            color: #0891b2;
            margin: 0 0 4px 0;
          }
          .brand-sub {
            font-size: 13px;
            color: #64748b;
            margin: 2px 0;
          }
          .meta-right {
            text-align: right;
          }
          .doc-type {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 6px 0;
          }
          .meta-line {
            font-size: 13px;
            color: #475569;
            margin: 2px 0;
          }
          .parties {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
          }
          .party-card {
            background: #f8fafc;
            padding: 14px 16px;
            border-radius: 6px;
            border-left: 3px solid #0891b2;
          }
          .party-title {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            color: #64748b;
            margin-bottom: 6px;
          }
          .party-name {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 2px 0;
          }
          .party-text {
            font-size: 13px;
            color: #475569;
            margin: 2px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th {
            background: #0f172a;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            padding: 10px 12px;
            text-align: left;
          }
          .total-box {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
          }
          .total-table {
            width: 260px;
          }
          .total-table td {
            padding: 6px 10px;
            font-size: 13px;
          }
          .total-row {
            background: #0891b2;
            color: #fff;
            font-weight: 700;
            font-size: 15px;
          }
          .total-row td {
            color: #fff;
            padding: 10px;
          }
          .footer {
            border-top: 1px dashed #cbd5e1;
            padding-top: 15px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
          .print-btn {
            background: #0891b2;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 20px;
          }
          @media print {
            .no-print { display: none !important; }
            body { padding: 0 !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: right; margin-bottom: 10px;">
          <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
        </div>
        <div class="invoice-box">
          <div class="header">
            <div>
              <h1 class="brand-title">${settings.companyName || "Viteruca Solutions Ltd."}</h1>
              <p class="brand-sub">${settings.street}, ${settings.city}, ${settings.country}</p>
              <p class="brand-sub">Email: ${settings.email} | Tel: ${settings.phone}</p>
            </div>
            <div class="meta-right">
              <div class="doc-type">INVOICE</div>
              <div class="meta-line"><strong>Invoice No:</strong> ${invoiceNum}</div>
              <div class="meta-line"><strong>Date:</strong> ${invoiceDate}</div>
              <div class="meta-line"><strong>Due Date:</strong> ${dueDate}</div>
              <div class="meta-line"><strong>Status:</strong> <span style="text-transform:uppercase; font-weight:bold;">${invoice.status || (invoice.draft ? "draft" : "pending")}</span></div>
            </div>
          </div>

          <div class="parties">
            <div class="party-card">
              <div class="party-title">Billed To</div>
              <div class="party-name">${clientName}</div>
              <div class="party-text">${clientStreet}</div>
              <div class="party-text">${[clientCity, clientCountry].filter(Boolean).join(", ")}</div>
              ${clientPhone ? `<div class="party-text">Phone: ${clientPhone}</div>` : ""}
            </div>
            <div class="party-card">
              <div class="party-title">Tax & Payment Terms</div>
              <div class="party-text"><strong>Tax ID:</strong> ${settings.taxNumber || "EG-TAX-98241084"}</div>
              <div class="party-text"><strong>Payment Due:</strong> Upon receipt or within due date</div>
              <div class="party-text"><strong>Accepted Methods:</strong> Wire Transfer, Cards, Cash</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 45%;">Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: center;">Discount</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total-box">
            <table class="total-table">
              <tr>
                <td style="color: #64748b;">Subtotal:</td>
                <td style="text-align: right; font-weight: 600;">${currency}${totalPrice}</td>
              </tr>
              <tr class="total-row">
                <td>Total Due:</td>
                <td style="text-align: right;">${currency}${totalPrice}</td>
              </tr>
            </table>
          </div>

          <div class="footer">
            <p style="margin: 0 0 4px 0; font-weight: 600;">${settings.notes || "Thank you for your business!"}</p>
            <p style="margin: 0;">Generated by ${settings.companyName || "Viteruca"} Invoice System</p>
          </div>
        </div>
        <script>
          // Auto trigger print dialog after document is ready
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};