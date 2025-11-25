import React, { useState } from 'react'
import Input from '../components/Input'

export default function Invoices() {
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
                                <section key={index} className={`card ${specificCard==index?'border':''}`} onClick={()=>{setSpecificCard(index)}}>
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
                        
                        />
                        <Input
                        type='date'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
