import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../actions/cartActions';
import './SuccessPage.css';

const SuccessPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
        localStorage.removeItem(`cartItems_${localStorage.getItem('user')}`);
    }, [dispatch]);

    return (
        <div className="success-page">
            <h1>Success!</h1>
            <p>Your order has been placed successfully.</p>
        </div>
    );
};

export default SuccessPage;