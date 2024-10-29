import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import CatalogPage from './components/Catalog-Page/CatalogPage';
import HomePage from './components/Home-Page/HomePage';
import ItemPage from './components/Item-Page/ItemPage';
import pr_album1 from './images/in_rainbows.png';
import pr_album2 from './images/dummy.jpg';
import pr_album3 from './images/demon_days.jpg';
import pr_album4 from './images/toxicity.jpg';
import pr_album5 from './images/nevermind.jpg';
import pr_album6 from './images/hk.jpg';
import ct_album1 from './images/ogwau.jpg';
import ct_album2 from './images/paranoid.png';
import ct_album3 from './images/blackstar.jpg';
import ct_album4 from './images/filosofem.jpg';
import ct_album5 from './images/ksg.jpg';
import ct_album6 from './images/tdsotm.png';

const album_data_preview = [
    { id: 1, img_path: pr_album1, album_name: "In Rainbows", artist_name: "Radiohead", year : '2007', genre: "Art Rock", price: "$20" },
    { id: 2, img_path: pr_album2, album_name: "Dummy", artist_name: "Portishead", year : '1994', genre: "Trip Hop", price: "$15" },
    { id: 3, img_path: pr_album3, album_name: "Demon Days", artist_name: "Gorillaz", year: '2005', genre: "Alternative Hip Hop", price: "$10" },
    { id: 4, img_path: pr_album4, album_name: "Toxicity", artist_name: "System of a Down", year: '2001', genre: "Alternative Metal", price: "$20" },
    { id: 5, img_path: pr_album5, album_name: "Nevermind", artist_name: "Nirvana", year: '1991', genre: "Grunge", price: "$15" },
    { id: 6, img_path: pr_album6, album_name: "Hollow Knight OST", artist_name: "Christopher Larkin", year: '2017', genre: "Cinematic Classical", price: "$25" },
    
];

const album_data_catalog = [
    { id: 7, img_path: ct_album1, album_name: 'Only God Was Above Us', artist_name: 'The Vampire Weekend', year: '2024', genre: 'Indie Rock', price: '$30' },
    { id: 8, img_path: ct_album2, album_name: 'Paranoid', artist_name: 'Black Sabbath', year: '1970', genre: 'Heavy Metal', price: '$25' },
    { id: 9, img_path: ct_album3, album_name: 'Blackstar', artist_name: 'David Bowie', year: '2016', genre: 'Jazz-Rock', price: '$25' },
    { id: 10, img_path: ct_album4, album_name: 'Filosofem', artist_name: 'Burzum', year: '1996', genre: 'Black Metal', price: '$20' },
    { id: 11, img_path: ct_album5, album_name: 'Kids See Ghosts', artist_name: 'Kid Cudi & Kanye West', year: '2018', genre: 'Experimental Hip Hop', price: '$25' },
    { id: 12, img_path: ct_album6, album_name: 'The Dark Side Of The Moon', artist_name: 'Pink Floyd', year: '1973', genre: 'Progressive Rock', price: '$20' },
];

const combined_album_data = [...album_data_preview, ...album_data_catalog];

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage album_data_preview={album_data_preview} />} />
                <Route path="/catalog" element={<CatalogPage album_data={album_data_catalog} />} />
                <Route path="/item/:id" element={<ItemPage albumData={combined_album_data} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;