import React from 'react'

export default function Input({id,name,placeholder,checked,value,fun,type='text'}) {
    return (
        <input 
        type={type} 
        value={value}
        placeholder={placeholder}
        onChange={fun}
        name={name}
        id={id}
        checked={type==='checkbox' ? checked : undefined}
        />
    )
}
