import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemAmount, setCartItems } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; // Import the CSS file

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
            const storedCartItems = JSON.parse(localStorage.getItem(`cartItems_${user}`)) || [];
            if (Array.isArray(storedCartItems) && storedCartItems.length) {
                dispatch(setCartItems(storedCartItems));
            }
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            console.log('Saving cart items to localStorage:', cartItems);
            localStorage.setItem(`cartItems_${user}`, JSON.stringify(cartItems));

            const savedItems = localStorage.getItem(`cartItems_${user}`);
            console.log('Current items in localStorage:', savedItems);
        }
    }, [cartItems, user]);

    const handleRemoveFromCart = (cartItemId) => {
        dispatch(removeFromCart(cartItemId));
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleAmountChange = (cartItemId, amount) => {
        dispatch(updateCartItemAmount(cartItemId, parseInt(amount, 10)));
    };

    const handleImageClick = (id) => {
        navigate(`/item/${id}`);
    };

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => {
            const basePrice = parseFloat(item.price.replace('$', ''));
            const colorPriceAdjustment = item.color === 'colored' ? 5 : item.color === 'exclusive-design' ? 10 : 0;
            const adjustedPrice = basePrice + colorPriceAdjustment;
            return total + (adjustedPrice * item.amount);
        }, 0);
    };

    const totalCost = calculateTotalCost();

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="when-empty">Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => {
                            const basePrice = parseFloat(item.price.replace('$', ''));
                            const colorPriceAdjustment = item.color === 'colored' ? 5 : item.color === 'exclusive-design' ? 10 : 0;
                            const adjustedPrice = basePrice + colorPriceAdjustment;
                            const totalPrice = adjustedPrice * item.amount;

                            return (
                                <li key={item.cartItemId}>
                                    <img
                                        src={`http://localhost:3002${item.img_path}`}
                                        alt={item.album_name}
                                        onClick={() => handleImageClick(item.id)}
                                        className="clickable-image"
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.album_name} - {item.artist_name}</h3>
                                        <p>Cost: ${totalPrice.toFixed(2)}</p>
                                        <p>Color: {item.color}</p>
                                        <label htmlFor={`amount-${item.cartItemId}`}>Amount:</label>
                                        <input
                                            type="number"
                                            id={`amount-${item.cartItemId}`}
                                            value={item.amount}
                                            onChange={(e) => handleAmountChange(item.cartItemId, e.target.value)}
                                            min="1"
                                        />
                                    </div>
                                    <button className="remove-button" onClick={() => handleRemoveFromCart(item.cartItemId)}>Remove</button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="total-cost">
                        <h3>Total cost: ${totalCost.toFixed(2)}</h3>
                    </div>
                    <button className="buy-button" onClick={handleCheckout}>Buy</button>
                </>
            )}
        </div>
    );
};

export default CartPage;