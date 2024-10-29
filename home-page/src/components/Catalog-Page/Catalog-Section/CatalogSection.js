import React from 'react';
import AlbumItem from '../../Album-Items/AlbumItem';
import './CatalogSection.css';

function CatalogSection({ album_data, searchValue, sortCriterion, selectedGenre, selectedDecade }) {
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
                        id={album.id}
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