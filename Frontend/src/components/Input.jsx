import React from 'react'

export default function Input({placeholder,value,fun,type='text'}) {
    return (
        <div>
        <input 
        type={type} 
        value={value}
        placeholder={placeholder}
        onChange={fun}
        />
        </div>
    )
}
