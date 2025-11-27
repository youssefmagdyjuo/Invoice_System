import { useEffect, useState } from 'react'
import InvoiceForm from '../components/InvoiceForm'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { resetInvoice } from '../features/invoice/invoiceSlice'
import { setFullInvoice } from '../features/invoice/invoiceSlice'
import axios from 'axios'
import Button from '../components/Button'
import PopUpLayout from '../components/PopUpLayout'
import DeletePopUp from '../components/DeletePopUp'
import GeneratePDF from '../components/PDF/GeneratePDF'
export default function DetailsInvoice() {

    const [openPopUp, setOpenPopUp] = useState(false)
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
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSpesificInvoice = async () => {
            try {
                const { data } = await axios.get(`/api/invoices/${id}`);
                dispatch(setFullInvoice(data.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchSpesificInvoice()
    }, [])

    const handleUpdate = async () => {
        try {
            alert('Updating Invoice')
            const updatedInvoice = await axios.put(`/api/invoices/${id}`, invoice);
            console.log(updatedInvoice.data);
            dispatch(resetInvoice());
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <PopUpLayout open={openPopUp}>
                <DeletePopUp
                    changeOpen={setOpenPopUp}
                    id={id}
                />
            </PopUpLayout>
            <InvoiceForm>
                <div className='flex gap-4'>
                    <Button
                        type={'button'}
                        text={'Update'}
                        style={'btn_primary'}
                        disabled={buttonDisabled}
                        fun={handleUpdate}
                        />
                        <GeneratePDF invoice={invoice}/>
                    <Button
                        type={'button'}
                        text={'Delete'}
                        style={'btn_danger'}
                        disabled={buttonDisabled}
                        fun={() => { setOpenPopUp(!openPopUp) }}
                    />
                </div>
            </InvoiceForm>
        </div>
    )
}
