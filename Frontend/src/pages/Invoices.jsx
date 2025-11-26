import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../features/all invoices/allInvoicesSlice';
import InvoicesTable from '../components/InvoicesTable';
export default function Invoices() {
    const dispatch = useDispatch();
    const [cards, setCards] = useState(
        [
            {
                icon: "fa-solid fa-folder-open",
                title: "All Invoices",
                count: 0
            },
            {
                icon: "fa-solid fa-floppy-disk",
                title: "Saved",
                count: 0
            },
            {
                icon: "fa-solid fa-pen-to-square",
                title: "Draft",
                count: 0
            }
        ]
    )
    useEffect(() => {
        // Fetch invoices from backend API
        const fetchInvoices = async () => {
            try {
                const { data } = await axios.get('/api/invoices');
                dispatch(setInvoices(data.data));
                // update the first card's count with fetched invoices length
                setCards(prevCards =>
                    prevCards.map((c, i) =>
                        i === 0 ? { ...c, count: data.data.length } :
                            i === 1 ? { ...c, count: data.data.filter(inv => inv.draft == false).length } :
                                i === 2 ? { ...c, count: data.data.filter(inv => inv.draft == true).length } :
                                    c
                    )
                );
            } catch (error) {
                console.log(error)
            }
        }
        fetchInvoices();
    }, [])

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
                            placeholder='Search by name..'
                        />
                        <Input
                            placeholder='Search by country..'
                        />
                        <Input
                            placeholder='Search by phone..'
                        />
                        <Input
                            type='date'
                        />
                    </div>
                    <InvoicesTable />
                </div>
            </div>
        </div>
    )
}
