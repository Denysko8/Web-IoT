import React from 'react';
import './CatalogPreview.css';
import AlbumItem from '../Album-Items/AlbumItem';
import Album1 from '../../images/in_rainbows.jfif';
import Album2 from '../../images/dummy.jfif';
import Album3 from '../../images/demon_days.jpg';

const album_list = [
    { id: 1, img_path: Album1, album_name: "In Rainbows", artist_name: "Radiohead", genre: "Art Rock", price: "$20" },
    { id: 2, img_path: Album2, album_name: "Dummy", artist_name: "Portishead", genre: "Trip Hop", price: "$15" },
    { id: 3, img_path: Album3, album_name: "Demon Days", artist_name: "Gorillaz", genre: "Alternative Hip Hop", price: "$10" }
];

function CatalogPreview() {
    return (
        <section className="catalog-preview">
            <h2 className="catalog-title">Best Sellers</h2>
            <div className="preview-tiles">
                {album_list.map(album => (
                    <AlbumItem
                        key={album.id}
                        img_path={album.img_path}
                        album_name={album.album_name}
                        artist_name={album.artist_name}
                        genre={album.genre}
                        price={album.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default CatalogPreview;
    