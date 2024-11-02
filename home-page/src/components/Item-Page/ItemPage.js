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
    console.log('Dispatching ADD_TO_CART with album:', album);
    dispatch(addToCart(album));
};

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
            <p>Price: {album.price}</p>
            <PrimaryButton className="buy-now" onClick={handleAddToCart}>Buy now!</PrimaryButton>
        </div>
    );
};

export default ItemPage;