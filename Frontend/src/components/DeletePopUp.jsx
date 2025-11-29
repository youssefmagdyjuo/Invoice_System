import React from 'react'
import Button from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { resetInvoice } from '../features/invoice/invoiceSlice'
import { useDispatch } from 'react-redux'
import {deleteInvoice} from '../features/all invoices/allInvoicesSlice'
export default function DeletePopUp({ changeOpen, id }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/invoices/${id}`)
            console.log(data.message)
            changeOpen(false)
            dispatch(resetInvoice())
            dispatch(deleteInvoice(id))
            navigate('/invoices');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' h-50 flex flex-col items-center justify-center gap-8'>
            <p className='text-lg'>Delete invoice from database ?</p>
            <div className='flex gap-4' >
                <Button
                    text={'Delete'}
                    style={'btn_danger'}
                    fun={handleDelete}
                />
                <Button
                    text={'Close'}
                    style={'btn_secondry'}
                    fun={() => { changeOpen(false) }}
                />
            </div>
        </div>
    )
}
