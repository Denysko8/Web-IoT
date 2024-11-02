import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../actions/cartActions';
import './CartPage.css'; // Import the CSS file

const CartPage = () => {
    const cartItems = useSelector(state => {
        console.log('Current Redux State:', state);
        return state.cart.items;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('CartPage rendered with items:', cartItems);

    const handleRemoveFromCart = (id) => {
        console.log('Removing from cart:', id);
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="when-empty">Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <img src={`http://localhost:3002${item.img_path}`} alt={item.album_name} />
                                <div>
                                    <h3>{item.album_name}</h3>
                                    <p>{item.artist_name}</p>
                                    <p>{item.year}</p>
                                    <p>{item.genre}</p>
                                    <p>{item.price}</p>
                                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="buy-button" onClick={handleCheckout}>Buy</button>
                </>
            )}
        </div>
    );
};

export default CartPage;