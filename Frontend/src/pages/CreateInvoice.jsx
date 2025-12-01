import InvoiceForm from '../components/InvoiceForm'
import { resetInvoice, setInvoiceNumber } from '../features/invoice/invoiceSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { generatePDF } from '../utilities/generatePDF';
import { incrementInvoice } from "../features/invoice/invoiceCounter"
export default function CreateInvoice() {
    const dispatch = useDispatch()
    const { lastNumber } = useSelector((state) => state.invoiceCounter);
    useEffect(() => {
        dispatch(resetInvoice());
    }, [])
    const invoice = useSelector((state) => state.invoice);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    // Print state
    const [printState, setPrintState] = useState(true);
    // Form validation state
    useEffect(() => {
        if (invoice.clientName
            && invoice.clientAddress['country']
            && invoice.clientAddress['city']
            && invoice.clientAddress['street']
            && invoice.products[0].product_name
            && invoice.products[0].product_price > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [invoice]);

    // Handle form submission
    const handleFormSubmission = async () => {
        try {
            const invoiceNumber = `INV-2025-${String(lastNumber).padStart(3, "0")}`;
            dispatch(setInvoiceNumber(invoiceNumber));
            dispatch(incrementInvoice());
            const invoiceToSend = { ...invoice, invoiceNumber };
            const savedInvoices = await axios.post('/api/invoices', invoiceToSend);
            console.log(savedInvoices.data);
            dispatch(resetInvoice());
            if (printState) {
                generatePDF(invoiceToSend);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <InvoiceForm printState={printState} setPrintState={setPrintState}>
                <Button
                    type={'button'}
                    text={'Save Invoice'}
                    style={'btn_primary'}
                    disabled={buttonDisabled}
                    fun={handleFormSubmission}
                />
            </InvoiceForm>
        </div>
    )
}
