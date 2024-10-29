import React from 'react';
import { useParams } from 'react-router-dom';
import './ItemPage.css';
import PrimaryButton from '../Catalog-Page/PrimaryButton';

const ItemPage = ({ albumData = [] }) => {
    const { id } = useParams();
    const album = albumData.find(album => album.id === parseInt(id));

    if (!album) {
        return <div>Album not found</div>;
    }

    return (
        <div className="item-page">
            <img src={album.img_path} alt={album.album_name} />
            <h2>{album.album_name}</h2>
            <p>Artist: {album.artist_name}</p>
            <p>Year: {album.year}</p>
            <p>Genre: {album.genre}</p>
            <p>Price: {album.price}</p>
            <PrimaryButton className="buy-now">Buy now!</PrimaryButton>
        </div>
    );
};

export default ItemPage;