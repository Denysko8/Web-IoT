import React from 'react';
import Header from './components/Header/header';
import Hero from './components/Hero/hero';
import CatalogPreview from './components/Calatog-Preview/CatalogPreview';
import Footer from './components/Footer/footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
    <Header />
    <div className="AppContainer">
      <Hero />
      <CatalogPreview />
    </div>
    <Footer />
    </>
  );
}

export default App;