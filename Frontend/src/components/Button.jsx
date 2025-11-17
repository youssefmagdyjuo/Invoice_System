import React from 'react'

export default function Button({ type, text, fun,style}) {
    return (
        <div>
            <button
                type={type}
                onClick={fun}
                className={`btn ${style}`}
            >
                {text}
            </button>
        </div>
    )
}
