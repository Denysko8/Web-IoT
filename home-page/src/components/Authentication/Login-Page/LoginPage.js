import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../../actions/cartActions';
import { loadCartFromStorage } from '../../../cartUtils';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to validate email format
    const validateEmail = (email) => {
        // Regular expression to check if email contains at least two characters after '.'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // Validate email format
        if (!validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Check email format before proceeding
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        // Store user email
        localStorage.setItem('user', email);
        
        // Load user's cart from storage
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
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <span className="error">{emailError}</span>}
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
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;
