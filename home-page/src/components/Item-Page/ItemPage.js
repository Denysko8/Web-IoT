import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ItemPage.css';
import PrimaryButton from '../Catalog-Page/PrimaryButton';
import { fetchAlbumById } from '../../api';
import { addToCart } from '../../actions/cartActions';

const ItemPage = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(1);
    const [color, setColor] = useState('standard');
    const [notification, setNotification] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const loadAlbum = async () => {
            try {
                setLoading(true);
                const data = await fetchAlbumById(id);
                setAlbum(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAlbum();
    }, [id]);

    const handleAddToCart = () => {
        const albumWithDetails = { ...album, amount, color };
        console.log('Dispatching ADD_TO_CART with album:', albumWithDetails);
        dispatch(addToCart(albumWithDetails));
        setNotification('Item added to cart!');
        setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    };

    const adjustedPrice = album ? parseFloat(album.price.replace('$', '')) : 0;
    const colorPriceAdjustment = color === 'colored' ? 5 : color === 'exclusive-design' ? 10 : 0;
    const totalCost = (adjustedPrice + colorPriceAdjustment) * amount;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!album) return <div>Album not found</div>;

    return (
        <div className="item-page">
            <img src={`http://localhost:3002${album.img_path}`} alt={album.album_name} />
            <h2>{album.album_name}</h2>
            <p>Artist: {album.artist_name}</p>
            <p>Year: {album.year}</p>
            <p>Genre: {album.genre}</p>
            <p>Price: ${adjustedPrice.toFixed(2)}</p>
            <hr />
            <div className="amount-container">
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                />
            </div>
            <div className="color-container">
                <label htmlFor="color">Color:</label>
                <select
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    <option value="standard">Standard (Black)</option>
                    <option value="colored">Colored (Limited Edition)</option>
                    <option value="exclusive-design">Marble (Exclusive design)</option>
                </select>
            </div>
            <p><strong>Final cost: ${totalCost.toFixed(2)}</strong></p>
            <PrimaryButton className="buy-now" onClick={handleAddToCart}>Buy now!</PrimaryButton>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default ItemPage;