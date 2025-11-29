import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoices } from '../features/all invoices/allInvoicesSlice';
import InvoicesTable from '../components/InvoicesTable';
export default function Invoices() {
    const dispatch = useDispatch();
    //get all invoices from redux slice
    const { invoices } = useSelector((state) => state.allInvoices);
    const [cards, setCards] = useState(
        [
            {
                icon: "fa-solid fa-folder-open",
                title: "All Invoices",
                count: 0,
                state:'all'
            },
            {
                icon: "fa-solid fa-floppy-disk",
                title: "Saved",
                count: 0,
                state:'saved'
            },
            {
                icon: "fa-solid fa-pen-to-square",
                title: "Draft",
                count: 0,
                state:'draft'
            }
        ]
    )
    //inputs status
    const [clientName,setClientName] = useState('')
    const [clientPhone,setClientPhone] = useState('')
    const [clientCountry,setClientCountry] = useState('')
    const [invoiceDate,setInvoiceDate] = useState(null)
    //fetching all invoices
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
    //update state of cards
    useEffect(() => {
        setCards(prevCards =>
            prevCards.map((c, i) =>
                i === 0 ? { ...c, count: invoices.length } :
                    i === 1 ? { ...c, count: invoices.filter(inv => inv.draft == false).length } :
                        i === 2 ? { ...c, count: invoices.filter(inv => inv.draft == true).length } :
                            c
            )
        );
    },[invoices])
    const [specificCard, setSpecificCard] = useState('all');
    
    return (
        <div>
            <div className="page">
                <div className='page_container'>
                    <div className='flex justify-between gap-4'>
                        {
                            cards.map((card, index) => (
                                <section key={index} className={`card ${specificCard == card.state ? 'border' : ''}`} onClick={() => { setSpecificCard(card.state) }}>
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
                            placeholder='Search by name..'
                            value={clientName}
                            fun={(e) => { setClientName(e.target.value.trim().toLowerCase()) }}
                        />
                        <Input
                            placeholder='Search by country..'
                            value={clientCountry}
                            fun={(e) => { setClientCountry(e.target.value.trim().toLowerCase()) }}
                        />
                        <Input
                            placeholder='Search by phone..'
                            value={clientPhone}
                            fun={(e) => { setClientPhone(e.target.value.trim()) }}
                        />
                        <Input
                            type='date'
                            value={invoiceDate}
                            fun={(e) => setInvoiceDate(e.target.value)}
                        />
                    </div>
                    <InvoicesTable 
                    stateInvoiceUi={specificCard}
                    clientName={clientName}
                    clientPhone={clientPhone}
                    clientCountry={clientCountry}
                    invoiceDate={invoiceDate}
                    />
                </div>
            </div>
        </div>
    )
}
