import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
export default function NavBar() {
    const links = [
        { to: '/', icon: 'fa-house', label: 'Home' },
        { to: '/createInvoice', icon: 'fa-plus', label: 'Create Invoice' },
        { to: '/invoices', icon: 'fa-file-invoice', label: 'Invoices' },
        { to: '#', icon: 'fa-user', label: 'Clients' },
        { to: '#', icon: 'fa-gear', label: 'Settings' },
    ];
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <div className='navBar_container'>
            <span
                onClick={() => setIsOpen(!isOpen)}
                className='navBar_button'>{isOpen
                    ? <i class="fa-solid fa-xmark"></i>
                    : <i class="fa-solid fa-bars"></i>}</span>
            <nav className={`${isOpen ? 'nav_active' : ''}`}>
                <ul>
                    {links.map((link, index) => (
                        <Link to={link.to} key={index} onClick={() => setIsOpen(false)}>
                            <li className={isActive(link.to) ? 'active_link' : ''}>
                                <i className={`fa-solid ${link.icon}`}></i>
                                <span>{link.label}</span>
                            </li>
                        </Link>
                    ))}
                </ul>

            </nav>
        </div>
    )
}
