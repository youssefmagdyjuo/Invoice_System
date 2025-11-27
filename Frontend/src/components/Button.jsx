import React from 'react'

export default function Button({icon, type, text, fun,style ,disabled,id,name}) {
    return (
        <div>
            <button
                type={type}
                onClick={fun}
                className={`btn ${style}`}
                disabled={disabled}
                id={id}
                name={name}
            >
                {icon} {text}
                
            </button>
        </div>
    )
}
