import Button from '../components/Button';
import ClientInfo from '../components/ClientInfo';
import EnterProducts from '../components/EnterProducts';
import { useSelector, useDispatch } from 'react-redux';
import { draftToggle ,resetInvoice} from '../features/invoice/invoiceSlice';
import React from 'react';
import axios from 'axios';
import Input from '../components/Input';
export default function InvoiceForm() {
    // Print state
    const [printState, setPrintState] = React.useState(true);
    const dispatch = useDispatch();
    const invoice = useSelector((state) => state.invoice);
    // Form validation state
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    React.useEffect(() => {
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
            const savedInvoices = await axios.post('/api/invoices', invoice);
            console.log(savedInvoices.data);
            dispatch(resetInvoice());

        } catch (error) {
            console.log(error)

        }
    }
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
                    <Button
                        type={'button'}
                        text={'Save Invoice'}
                        style={'btn_primary'}
                        disabled={buttonDisabled}
                        fun={() => { handleFormSubmission() }}
                    />
                </form>
            </div>
        </div>
    )
}
