import React from 'react';
import AlbumItem from '../../Album-Items/AlbumItem';
import album1 from '../../../images/ogwau.png';
import album2 from '../../../images/paranoid.png';
import album3 from '../../../images/blackstar.jpg';
import album4 from '../../../images/filosofem.jpg';
import album5 from '../../../images/ksg.jpg';
import album6 from '../../../images/tdsotm.png';
import './CatalogSection.css';

function AlbumsPage() {
    const album_data = [
        {
            img_path: album1, album_name: 'Only God Was Above Us', artist_name: 'The Vampire Weekend', year : '2024', genre: 'Indie Rock', price: '$30'},
        { img_path: album2, album_name: 'Paranoid', artist_name: 'Black Sabbath', year : '1970', genre: 'Heavy Metal', price: '$25' },
        { img_path: album3, album_name: 'Blackstar', artist_name: 'David Bowie', year : '2016', genre: 'Jazz-Rock', price: '$25' },
        { img_path: album4, album_name: 'Filosofem', artist_name: 'Burzum', year : '1996', genre: 'Black Metal', price: '$20' },
        {
            img_path: album5, album_name: 'Kids See Ghosts', artist_name: 'Kid Cudi & Kanye West', year : '2018', genre: 'Experimental Hip Hop',
            price: '$25'
        },
        { img_path: album6, album_name: 'The Dark Side Of The Moon', artist_name: 'Pink Floyd', year : '1973', genre: 'Progressive Rock', price: '$20' },
    ];

    return (
        <div className="albums-page">
            <div className="albums-container">
                {album_data.map((album, index) => (
                    <AlbumItem
                        key={index}
                        img_path={album.img_path}
                        album_name={album.album_name}
                        artist_name={album.artist_name}
                        year={album.year}
                        genre={album.genre}
                        price={album.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default AlbumsPage;