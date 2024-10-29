import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumItem.css';
import PrimaryButton from '../Catalog-Page/PrimaryButton';

function AlbumItem({ id, img_path, album_name, artist_name, year, genre, price }) {
    return (
        <div className="catalog-item">
            <div className="item-image">
                <img className="album-image" src={img_path} alt={album_name} />
            </div>
            <h3>{album_name}</h3>
            <p>{artist_name}</p>
            <p>{year}</p>
            <p>{genre}</p>
            <p className="price">{price}</p>
            <Link to={`/item/${id}`}>
                <PrimaryButton>I want this!</PrimaryButton>
            </Link>
        </div>
    );
}

export default AlbumItem;