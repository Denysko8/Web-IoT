import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AddSongs from './components/AddSongs';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Home />
        <ProductList />
        <AddSongs />
      </div>
      <Footer />
    </div>
  );
}

export default App;