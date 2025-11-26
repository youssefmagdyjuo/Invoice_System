import Button from './Button';
import ClientInfo from './ClientInfo';
import EnterProducts from './EnterProducts';
import { useSelector, useDispatch } from 'react-redux';
import { draftToggle } from '../features/invoice/invoiceSlice';
import React, { useState } from 'react';
// import axios from 'axios';
import Input from './Input';
export default function InvoiceForm({ children }) {
    // Print state
    const [printState, setPrintState] = useState(true);
    const dispatch = useDispatch();
    const invoice = useSelector((state) => state.invoice);

    return (
        <div className="page">
            <div className='page_container'>
                <form>
                    <ClientInfo />
                    <EnterProducts />
                    <React.Fragment>
                        <p><strong>Total Price :</strong> {invoice?.total_price ?? 0}$</p>
                        <p><strong>Date :</strong> {invoice.date.split("T")[0]}</p>
                    </React.Fragment>
                    <div className='flex gap-4'>
                        <Input
                            type='checkbox'
                            checked={invoice.draft}
                            fun={() => {
                                if (printState && !invoice.draft) {
                                    setPrintState(false);
                                }
                                dispatch(draftToggle());
                            }}
                        />
                        <p>Save Invoice as a draft</p>
                    </div>
                    <div className='flex gap-4'>
                        <Input
                            type='checkbox'
                            checked={printState}
                            fun={() => {
                                invoice.draft ? setPrintState(false) : setPrintState((prev) => !prev)
                            }}
                        />
                        <p>Print Invoice as a PDF</p>
                    </div>
                            {
                                children
                            }
                </form>
            </div>
        </div>
    )
}
