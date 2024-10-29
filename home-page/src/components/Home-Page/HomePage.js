import React, { useState } from 'react';
import CatalogPreview from "./Catalog-Preview/CatalogPreview";
import HeroSection from "./Hero/hero";
import PrimaryButton from '../Catalog-Page/PrimaryButton';
import '../Album-Items/AlbumItem.css';
import './Hero/hero.css';
import './Catalog-Preview/CatalogPreview.css';
import './HomePage.css'; // Make sure to import your homepage styles

const HomePage = ({ album_data_preview }) => {
    const [showMore, setShowMore] = useState(false);

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    const visibleAlbums = showMore ? album_data_preview : album_data_preview.slice(0, 3);

    return (
        <div className="home-page">
            <HeroSection />
            <CatalogPreview album_data_preview={visibleAlbums} />
            <div className="button-container">
                <PrimaryButton onClick={handleViewMore}>
                    {showMore ? 'View less' : 'View more'}
                </PrimaryButton>
            </div>
        </div>
    );
}

export default HomePage;
