import React, { useEffect, useState } from 'react';

const Toast = ({
    message,
    type = 'info',
    duration = 3000,
    onClose,
    isVisible = true,
}) => {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        // schedule the prop -> state sync to avoid synchronous setState inside the effect
        const syncTimer = setTimeout(() => setShow(isVisible), 0);

        let dismissTimer;
        if (isVisible && duration) {
            dismissTimer = setTimeout(() => {
                setShow(false);
                onClose && onClose();
            }, duration);
        }

        return () => {
            clearTimeout(syncTimer);
            if (dismissTimer) clearTimeout(dismissTimer);
        };
    }, [duration, isVisible, onClose]);

    if (!show) return null;

    const toastTypeStyles = {
        success: 'bg-[var(--primary-color)] border-l-4 border-[var(--primary-color)] text-white',
        error: 'bg-danger border-l-4 border-primary text-white',
        info: 'bg-primary-disabled border-l-4 border-primary text-white'
    };

    const toastIcons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    return (
        <div
            className={`
                fixed bottom-20 right-4 
                min-w-[300px] max-w-[400px] 
                z-50 rounded-lg shadow-xl 
                bg-[var(--secondry-color)] transition-all duration-300 ease-in-out
                ${toastTypeStyles[type]}
                animate-fade-in-down 
            `}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">{toastIcons[type]}</span>
                    <p className="font-medium">{message}</p>
                </div>

                <button
                    className={`
                        opacity-100 hover:opacity-100 
                        transition-opacity duration-200 
                        text-2xl font-bold focus:outline-none
                    `}
                    onClick={() => {
                        setShow(false);
                        onClose && onClose();
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast;
