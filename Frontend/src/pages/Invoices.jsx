import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../features/all invoices/allInvoicesSlice';
import InvoicesTable from '../components/InvoicesTable';
export default function Invoices() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch invoices from backend API
        const fetchInvoices = async () => {
            try {
                const { data } = await axios.get('/api/invoices');
                dispatch(setInvoices(data.data));
            } catch (error) {
                console.log(error)
            }
        }
        fetchInvoices();
    }, [])
    const cards = [
        {
            icon: "fa-solid fa-folder-open",
            title: "All Invoices",
            count: 58
        },
        {
            icon: "fa-solid fa-floppy-disk",
            title: "Saved",
            count: 42
        },
        {
            icon: "fa-solid fa-pen-to-square",
            title: "Draft",
            count: 16
        }
    ]
    const [specificCard, setSpecificCard] = useState(0);
    return (
        <div>
            <div className="page">
                <div className='page_container'>
                    <div className='flex justify-between gap-4'>
                        {
                            cards.map((card, index) => (
                                <section key={index} className={`card ${specificCard == index ? 'border' : ''}`} onClick={() => { setSpecificCard(index) }}>
                                    <div className='flex gap-4 items-center mb-2 '>
                                        <i className={card.icon}></i>
                                        <strong>{card.title}</strong>
                                    </div>
                                    <h1>( {card.count} )</h1>
                                </section>
                            ))
                        }
                    </div>
                    <div className='filter_section'>
                        <Input
                        placeholder='Search by client name or phone'
                        />
                        <Input
                            type='date'
                        />
                    </div>
                    <InvoicesTable/>
                </div>
            </div>
        </div>
    )
}
