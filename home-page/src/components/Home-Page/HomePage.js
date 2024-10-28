import React from 'react';
import CatalogPreview from "./Catalog-Preview/CatalogPreview";
import HeroSection from "./Hero/hero";
import '../Album-Items/AlbumItem.css';
import './Hero/hero.css';
import './Catalog-Preview/CatalogPreview.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <CatalogPreview/>
        </div>
    );
}

export default HomePage;
