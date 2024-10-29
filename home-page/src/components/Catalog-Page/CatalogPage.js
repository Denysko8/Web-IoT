import React, { useState } from 'react';
import ControlSection from './Control-Section/ControlSection';
import CatalogSection from './Catalog-Section/CatalogSection';

const CatalogPage = () => {
    const genreOptions = ['All genres', 'Rock', 'Metal', 'Hip Hop'];
    const decadeOptions = ['All decades', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

    const [searchValue, setSearchValue] = useState('');
    const [sortCriterion, setSortCriterion] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All genres');
    const [selectedDecade, setSelectedDecade] = useState('All decades');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSortChange = (criterion) => {
        // Toggle sorting: If the same button is clicked again, reset the sort criterion
        setSortCriterion((prev) => (prev === criterion ? '' : criterion));
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
            <CatalogSection
                searchValue={searchValue}
                sortCriterion={sortCriterion}
                selectedGenre={selectedGenre}
                selectedDecade={selectedDecade}
            />
        </div>
    );
};

export default CatalogPage;
