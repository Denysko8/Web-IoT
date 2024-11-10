import React, { useState, useEffect } from 'react';
import ControlSection from './Control-Section/ControlSection';
import CatalogSection from './Catalog-Section/CatalogSection';
import Loader from '../Loader/loader';
import { fetchAlbums } from '../../api';
import { addToCart, getCart } from '../../cartUtils'; // Import your cart utilities

const CatalogPage = () => {
    const genreOptions = ['All genres', 'Rock', 'Trip Hop', 'Metal', 'Hip Hop', 'Other'];
    const decadeOptions = ['All decades', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

    const [searchValue, setSearchValue] = useState('');
    const [sortCriterion, setSortCriterion] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedGenre, setSelectedGenre] = useState('All genres');
    const [selectedDecade, setSelectedDecade] = useState('All decades');
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]); // State for the cart

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

    useEffect(() => {
        const savedCart = getCart(); // Load cart on mount
        setCart(savedCart);
    }, []);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSortChange = (criterion) => {
        if (criterion === sortCriterion) {
            if (sortDirection === 'desc') {
                setSortDirection('asc');
            } else {
                setSortCriterion('');
                setSortDirection('asc');
            }
        } else {
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

    const handleAddToCart = (album) => {
        addToCart(album); // Add album to cart
        setCart(prevCart => [...prevCart, album]); // Update cart state
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
                <CatalogSection 
                    album_data={albums} 
                    onAddToCart={handleAddToCart} // Pass the handler down to CatalogSection
                />
            )}
        </div>
    );
};

export default CatalogPage;
