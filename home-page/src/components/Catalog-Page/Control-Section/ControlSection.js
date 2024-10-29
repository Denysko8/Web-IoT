import React from 'react';
import './ControlSection.css';
import Select from '../Select'; // Make sure to import the Select component

const ControlSection = ({ 
    searchValue, 
    onSearchChange, 
    onSortChange, 
    genreOptions, 
    selectedGenre, 
    onGenreChange, 
    decadeOptions, 
    selectedDecade, 
    onDecadeChange 
}) => {
    return (
        <div className="control-section">
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchValue}
                onChange={onSearchChange}
            />
            <div className="sorting-section">
                <span>Sort by:</span>
                <button className="sort-button" onClick={() => onSortChange('year')}>year</button>
                <button className="sort-button" onClick={() => onSortChange('price')}>price</button>
            </div>
            <div className="filter-section">
                <span>Filter by Genre:</span>
                <Select 
                    name="genre"
                    options={genreOptions}
                    value={selectedGenre}
                    onChange={onGenreChange}
                />
                <span>Filter by Decade:</span>
                <Select 
                    name="decade"
                    options={decadeOptions}
                    value={selectedDecade}
                    onChange={onDecadeChange}
                />
            </div>
        </div>
    );
}

export default ControlSection;
