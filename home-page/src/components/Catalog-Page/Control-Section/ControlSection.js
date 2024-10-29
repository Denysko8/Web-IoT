import React from 'react';
import './ControlSection.css';

const ControlSection = () => {
    return (
        <div className="control-section">
            <input type="text" placeholder="Search..." className="search-input" />
            <div className="filter-section">
                <span>Sort by:</span>
                <button className="sort-button">year</button>
                <button className="sort-button">size</button>
            </div>
        </div>
    );
}

export default ControlSection;