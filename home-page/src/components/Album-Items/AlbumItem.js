import React from 'react';
import './AlbumItem.css';
import PrimaryButton from '../Catalog-Page/PrimaryButton';

function AlbumItem({ img_path, album_name, artist_name, genre, price }) {
    return (
        <div className="catalog-item">
            <div className="item-image">
                <img className="album-image" src={img_path} alt={album_name} />
            </div>
            <h3>{album_name}</h3>
            <p>{artist_name}</p>
            <p>{genre}</p>
            <p className="price">{price}</p>
            <PrimaryButton onClick={""}>View More</PrimaryButton>
        </div>
    );
}

export default AlbumItem;
