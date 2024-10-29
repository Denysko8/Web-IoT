import React from 'react';
import CatalogSection from './Catalog-Section/CatalogSection';
import './Catalog-Section/CatalogSection.css';
import ControlSection from './Control-Section/ControlSection';
import './Control-Section/ControlSection.css';

const CatalogPage = () => {
    return (
        <div className="catalog-page">
            <ControlSection />
            <CatalogSection />
        </div>
    );
}

export default CatalogPage;