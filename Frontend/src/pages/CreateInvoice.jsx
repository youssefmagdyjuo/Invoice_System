import InvoiceForm from '../components/InvoiceForm'
import { useDispatch } from 'react-redux';
import { resetInvoice } from '../features/invoice/invoiceSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useEffect, useState } from 'react';


export default function CreateInvoice() {
    const invoice = useSelector((state) => state.invoice);
    const [buttonDisabled, setButtonDisabled] = useState(false);
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


    const dispatch = useDispatch();
    // Handle form submission
    const handleFormSubmission = async () => {
        try {
            alert('Submitting Form');
            const savedInvoices = await axios.post('/api/invoices', invoice);
            console.log(savedInvoices.data);
            dispatch(resetInvoice());

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div>
            <InvoiceForm>
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
