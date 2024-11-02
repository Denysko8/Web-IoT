import React, { useState, useEffect } from 'react';
import ControlSection from './Control-Section/ControlSection';
import CatalogSection from './Catalog-Section/CatalogSection';
import Loader from '../Loader/loader';
import { fetchAlbums } from '../../api';

const CatalogPage = () => {
    const genreOptions = ['All genres', 'Rock', 'Metal', 'Hip Hop'];
    const decadeOptions = ['All decades', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

    const [searchValue, setSearchValue] = useState('');
    const [sortCriterion, setSortCriterion] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); // Add this state
    const [selectedGenre, setSelectedGenre] = useState('All genres');
    const [selectedDecade, setSelectedDecade] = useState('All decades');
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAlbums({
                    searchQuery: searchValue,
                    genre: selectedGenre,
                    decade: selectedDecade,
                    sortBy: sortCriterion
                });
                setAlbums(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAlbums();
    }, [searchValue, selectedGenre, selectedDecade, sortCriterion]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSortChange = (criterion) => {
        if (criterion === sortCriterion) {
            // If clicking the same criterion, toggle direction or clear sort
            if (sortDirection === 'desc') {
                setSortDirection('asc');
            } else {
                setSortCriterion('');
                setSortDirection('asc');
            }
        } else {
            // If clicking a new criterion, set it with ascending direction
            setSortCriterion(criterion);
            setSortDirection('desc');
        }
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleDecadeChange = (event) => {
        setSelectedDecade(event.target.value);
    };

    return (
        <div className="catalog-page">
            <ControlSection 
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                genreOptions={genreOptions}
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
                decadeOptions={decadeOptions}
                selectedDecade={selectedDecade}
                onDecadeChange={handleDecadeChange}
            />
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <CatalogSection album_data={albums} />
            )}
        </div>
    );
};

export default CatalogPage;