import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../images/logo.png';

function Header() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="header">
            <img className="logo" src={logo} alt="Logo" />
            <h1 className="title-name">RadioDream</h1>
            <nav className="nav-container">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {user && (
                        <>
                            <li className="vertical-line"></li>
                            <li>
                                <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;