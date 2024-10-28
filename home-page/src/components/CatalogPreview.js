import React from 'react';
import './CatalogPreview.css';
import Album1 from '../images/in_rainbows.jfif';
import Album2 from '../images/dummy.jfif';
import Album3 from '../images/demon_days.jpg';

function CatalogPreview() {
    return (
        <section className="catalog-preview">
            <h2 className="catalog-title">Best Sellers</h2>
            <div className='preview-tiles'>
                <div className="catalog-item">
                    <div className="item-image"><img className='album-image' src={Album1} alt='Album 1'></img></div>
                    <h3>In Rainbows</h3>
                    <p>Radiohead</p>
                    <p>Art Rock</p>
                    <p className="price">$20</p>
                    <button>Buy</button>
                </div>
                <div className="catalog-item">
                    <div className="item-image"><img className='album-image' src={Album2} alt='Album 2'></img></div>
                    <h3>Dummy</h3>
                    <p>Portishead</p>
                    <p>Trip Hop</p>
                    <p className="price">$15</p>
                    <button>Buy</button>
                </div>
                <div className="catalog-item">
                    <div className="item-image"><img className='album-image' src={Album3} alt='Album 3'></img></div>
                    <h3>Demon Days</h3>
                    <p>Gorillaz</p>
                    <p>Alternative Hip Hop</p>
                    <p className="price">$10</p>
                    <button>Buy</button>
                </div>
            </div>
        </section>
    );
}

export default CatalogPreview;