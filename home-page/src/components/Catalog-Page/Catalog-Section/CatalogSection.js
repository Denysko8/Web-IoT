import React from 'react';
import AlbumItem from '../../Album-Items/AlbumItem';
import album1 from '../../../images/ogwau.png';
import album2 from '../../../images/paranoid.png';
import album3 from '../../../images/blackstar.jpg';
import album4 from '../../../images/filosofem.jpg';
import album5 from '../../../images/ksg.jpg';
import album6 from '../../../images/tdsotm.png';
import './CatalogSection.css';

function CatalogSection({ searchValue, sortCriterion, selectedGenre, selectedDecade }) {
    const album_data = [
        { img_path: album1, album_name: 'Only God Was Above Us', artist_name: 'The Vampire Weekend', year: '2024', genre: 'Indie Rock', price: '$30' },
        { img_path: album2, album_name: 'Paranoid', artist_name: 'Black Sabbath', year: '1970', genre: 'Heavy Metal', price: '$25' },
        { img_path: album3, album_name: 'Blackstar', artist_name: 'David Bowie', year: '2016', genre: 'Jazz-Rock', price: '$25' },
        { img_path: album4, album_name: 'Filosofem', artist_name: 'Burzum', year: '1996', genre: 'Black Metal', price: '$20' },
        { img_path: album5, album_name: 'Kids See Ghosts', artist_name: 'Kid Cudi & Kanye West', year: '2018', genre: 'Experimental Hip Hop', price: '$25' },
        { img_path: album6, album_name: 'The Dark Side Of The Moon', artist_name: 'Pink Floyd', year: '1973', genre: 'Progressive Rock', price: '$20' },
    ];

    const trimmedSearchValue = searchValue.trim().toLowerCase();

    // Filter albums based on genre and decade
    const filteredAlbums = album_data.filter(album => {
        const matchesSearch = album.album_name.toLowerCase().includes(trimmedSearchValue) ||
            album.artist_name.toLowerCase().includes(trimmedSearchValue);

        const matchesGenre = selectedGenre === 'All genres' || album.genre.includes(selectedGenre);
        
        // Check if the album year is within the selected decade
        const decadeStart = selectedDecade === 'All decades' ? true : parseInt(album.year) >= parseInt(selectedDecade) && parseInt(album.year) < parseInt(selectedDecade) + 10;

        return matchesSearch && matchesGenre && decadeStart;
    });

    // Sort albums based on the sort criterion
    const sortedAlbums = [...filteredAlbums].sort((a, b) => {
        if (!sortCriterion) return 0; // No sorting
        if (sortCriterion === 'year') {
            return parseInt(a.year) - parseInt(b.year);
        } else if (sortCriterion === 'price') {
            return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1)); // Remove '$' and compare prices
        }
        return 0;
    });

    return (
        <div className="albums-page">
            <div className="albums-container">
                {sortedAlbums.map((album, index) => (
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

export default CatalogSection;
