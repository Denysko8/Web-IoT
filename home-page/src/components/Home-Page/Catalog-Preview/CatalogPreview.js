import React from 'react';
import './CatalogPreview.css';
import AlbumItem from '../../Album-Items/AlbumItem';

function CatalogPreview({ album_data_preview }) {
    return (
        <section className="catalog-preview">
            <h2 className="catalog-title">Best Sellers</h2>
            <div className="preview-tiles">
                {album_data_preview.map(album => (
                    <AlbumItem
                        key={album.id}
                        id={album.id}
                        img_path={`http://localhost:3002${album.img_path}`}
                        album_name={album.album_name}
                        artist_name={album.artist_name}
                        year={album.year}
                        genre={album.genre}
                        price={album.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default CatalogPreview;