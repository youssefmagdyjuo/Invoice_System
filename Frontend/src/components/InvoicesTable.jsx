import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PopUpLayout from './PopUpLayout';
import DeletePopUp from './DeletePopUp';
import { generatePDF } from '../utilities/generatePDF';

export default function InvoicesTable({ stateInvoiceUi, clientName, clientPhone, clientCountry, invoiceDate }) {
    const [openPopUp, setOpenPopUp] = useState(false)
    const [id, setId] = useState(null)
    const { invoices } = useSelector((state) => state.allInvoices);
    const [openOptionsIndex, setOpenOptionsIndex] = React.useState(null);

    // ================================
    // 1) FILTER BY STATE (all / saved / draft)
    // ================================
    const filteredByStatus = invoices.filter((inv) => {
        if (stateInvoiceUi === "all") return true;
        if (stateInvoiceUi === "saved") return inv.draft === false;
        if (stateInvoiceUi === "draft") return inv.draft === true;
    });

    // ================================
    // 2) SEARCH FILTER (name + phone + country + date)
    // ================================
    const filteredInvoices = filteredByStatus.filter((inv) => {
        const matchName = inv.clientName.includes(clientName);
        const matchPhone = inv.clientPhone.includes(clientPhone);
        const matchCountry = inv.clientAddress.country.includes(clientCountry);
        const invoiceDateFormatted = inv.date.split("T")[0];
        const matchDate = invoiceDate ? invoiceDateFormatted === invoiceDate : true;
        return matchName && matchPhone && matchCountry && matchDate;
    });

    return (
        <>
            <PopUpLayout open={openPopUp}>
                <DeletePopUp changeOpen={setOpenPopUp} id={id} />
            </PopUpLayout>

            <table className='invoices_table'>
                <thead>
                    <tr>
                        <th>Invoice</th>
                        <th>Client</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.length === 0
                        ? (<p className="no_results">No invoices found</p>)
                        : (
                            filteredInvoices.map((invoice, index) => (
                                <tr key={invoice._id}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.clientName}</td>
                                    <td>{invoice.clientAddress.country}</td>
                                    <td>{invoice.clientPhone}</td>
                                    <td>{invoice.date.split("T")[0]}</td>
                                    <td>{invoice.total_price}$</td>
                                    <td
                                        onClick={() => openOptionsIndex == index ? setOpenOptionsIndex(null) : setOpenOptionsIndex(index)}
                                        className='relative cursor-pointer'
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>

                                        <ul className={`moreOptions ${openOptionsIndex === index ? 'flex' : ''}`}>
                                            {/* View invoice  */}
                                            <Link to={`/invoices/invoiceDetails/${invoice._id}`}>
                                                <li className='flex gap-2 items-center '>
                                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                                    View Invoice
                                                </li>
                                            </Link>
                                            {/* Downloud PDF  */}
                                            <li
                                                onClick={() => {
                                                    generatePDF(invoice)
                                                }}
                                                className='flex gap-2 items-center '
                                            >
                                                <i class="fa-solid fa-download"></i>
                                                Downloud PDF
                                            </li>
                                            {/* Delete Invoice  */}
                                            <li
                                                onClick={() => {
                                                    setId(invoice._id)
                                                    setOpenPopUp(true)
                                                }}
                                                className='flex gap-2 items-center '
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                                Delete Invoice
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
