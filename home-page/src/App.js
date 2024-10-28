import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import AlbumsPage from './components/Catalog-Page/Catalog-Section/CatalogSection';
import HomePage from './components/Home-Page/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/catalog" element={<AlbumsPage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;