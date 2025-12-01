export default function HTMLTemplate({invoice}) {
    return (
        <div className="invoice-box">
            <style>{`
                @page {
                    size: A4;
                    margin: 20mm;
                }

                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .invoice-box {
                    padding: 20px;
                    border: 1px solid #ddd;
                }

                /*== Header ==*/
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #333;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                
                .header img {
                    width: 150px;
                }
                
                .company-details {
                    text-align: right;
                    font-size: 1rem;
                }
                
                .company-details h2 {
                    margin: 0;
                    color: #333;
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                
                /*== Details ==*/
                .details {
                    margin-bottom: 20px;
                }
                
                .details table {
                    width: 100%;
                }
                
                .details td {
                    padding: 4px 0;
                }
                
                /*== Items Table ==*/
                .items table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                
                .items th {
                    background: #f2f2f2;
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                
                .items td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                
                /*== Total Table ==*/
                .total {
                    /* text-align: right; */
                    margin-top: 20px;
                }
                
                .total table {
                    width: 50%;
                    /* float: right; */
                    border-collapse: collapse;
                }
                
                .total td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                
                /*== Footer ==*/
                .footer {
                    margin-top: 60px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                }
            `}</style>

            <div className="header">
                <div className="logo">
                    <img src="https://drive.google.com/file/d/1GNPj7IZOaCWnsjHYIYDVrAjCRQolwAtJ/view?usp=drive_link" alt="Company Logo" />
                </div>
                <div className="company-details">
                    <h2>Viteruca Ltd.</h2>
                    <p>123 Business St, Downtown<br />Alexandria, EG</p>
                    <p>Email: viteruca@gmail.com<br />Phone: +20 1286 289 971</p>
                </div>
            </div>

            <div className="details">
                <table>
                    <tr>
                        <td><strong>Invoice #: </strong>INV-2025-004</td>
                        <td><strong>Date: </strong>{invoice.date.split("T")[0]}</td>
                    </tr>
                    <tr>
                        <td><strong>Billed To:</strong> {invoice.clientName}<br />{invoice.clientAddress.street}</td>
                        <td><strong>Due Date:</strong> {invoice.dueDate.split("T")[0]}</td>
                    </tr>
                </table>
            </div>

            <div className="items">
                <table>
                    <thead>
                        <tr>
                            <th>Opject</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Descount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoice.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product_name}</td>
                                    <td>{product.count}</td>
                                    <td>{product.product_price}</td>
                                    <td>{product.descount}</td>
                                    <td>{product.product_total_price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="total">
                <table>
                    <tr>
                        <td><strong>Total Amount:</strong></td>
                        <td><strong>${invoice.total_price}</strong></td>
                    </tr>
                </table>
            </div>

            <div className="footer">
                <p>Thank you for your business!</p>
                <p>Payment due within 7 days from the invoice date.</p>
            </div>
        </div>
    )
}
