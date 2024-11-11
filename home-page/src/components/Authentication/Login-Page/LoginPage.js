import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../../actions/cartActions';
import { loadCartFromStorage } from '../../../cartUtils';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        let registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (!registeredUsers.includes(email)) {
            setErrorMessage('This email is not registered.');
            return;
        }

        let storedPasswordHash = localStorage.getItem(email);
        let inputPasswordHash = btoa(password);
        
        if (storedPasswordHash !== inputPasswordHash) {
            setErrorMessage('Incorrect password.');
            return;
        }

        localStorage.setItem('user', email);

        const userCart = loadCartFromStorage(email);
        dispatch(setCartItems(userCart));

        navigate('/');
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;
