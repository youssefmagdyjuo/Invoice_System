import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PopUpLayout from './PopUpLayout';
import DeletePopUp from './DeletePopUp';
export default function InvoicesTable() {
    const [openPopUp, setOpenPopUp] = useState(false)
    const [id,setId]= useState(null)
    const { invoices } = useSelector((state) => state.allInvoices);
    const [openOptionsIndex, setOpenOptionsIndex] = React.useState(null);
    return (
        <>
            <PopUpLayout open={openPopUp}>
                <DeletePopUp
                    changeOpen={setOpenPopUp}
                    id={id}
                />
            </PopUpLayout>
            <table className='invoices_table'>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoices.map((invoice, index) => (

                            <tr key={invoice._id}>
                                <td>{invoice.clientName}</td>
                                <td>{invoice.clientAddress.country}</td>
                                <td>{invoice.clientPhone}</td>
                                <td>{invoice.date.split("T")[0]}</td>
                                <td>{invoice.total_price}$</td>
                                <td
                                    onClick={() => {
                                        openOptionsIndex === index ? setOpenOptionsIndex(null) : setOpenOptionsIndex(index)
                                    }}
                                    // onMouseMove={() => {
                                    //     setOpenOptionsIndex(index)
                                    // }}
                                    // onMouseLeave={() => {
                                    //     setOpenOptionsIndex(null)
                                    // }}

                                    className='relative cursor-pointer'
                                >
                                    <i className="fa-solid fa-ellipsis"></i>
                                    <ul className={`moreOptions ${openOptionsIndex === index ? 'flex' : ''}`}>
                                        <Link to={`/invoiceDetails/${invoice._id}`}>
                                            <li className='flex gap-2 items-center '>
                                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                                View Invoice
                                            </li>
                                        </Link>
                                        <li 
                                        onClick={()=>{
                                            setId(invoice._id)
                                            setOpenPopUp(true)
                                        }}
                                        className='flex gap-2 items-center '>
                                            <i class="fa-solid fa-trash"></i>
                                            Delete Invoice
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>

    )
}
