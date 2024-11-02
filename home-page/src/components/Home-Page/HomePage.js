import React, { useState, useEffect } from 'react';
import CatalogPreview from "./Catalog-Preview/CatalogPreview";
import HeroSection from "./Hero/hero";
import PrimaryButton from '../Catalog-Page/PrimaryButton';
import { fetchPreviewAlbums } from '../../api';
import '../Album-Items/AlbumItem.css';
import './Hero/hero.css';
import './Catalog-Preview/CatalogPreview.css';
import './HomePage.css'; // Make sure to import your homepage styles

const HomePage = () => {
    const [showMore, setShowMore] = useState(false);
    const [albumData, setAlbumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                setLoading(true);
                const data = await fetchPreviewAlbums();
                setAlbumData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAlbums();
    }, []);

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    const visibleAlbums = showMore ? albumData : albumData.slice(0, 3);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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