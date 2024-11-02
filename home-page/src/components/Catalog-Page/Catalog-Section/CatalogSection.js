import React from 'react';
import AlbumItem from '../../Album-Items/AlbumItem';
import './CatalogSection.css';

const CatalogSection = ({ album_data }) => {
    return (
        <div className="albums-page">
            <div className="albums-container">
                {album_data.map((album) => (
                    <AlbumItem
                        key={album.id}
                        id={album.id}
                        img_path={`http://localhost:3002${album.img_path}`}                       album_name={album.album_name}
                        artist_name={album.artist_name}
                        year={album.year}
                        genre={album.genre}
                        price={album.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default CatalogSection;