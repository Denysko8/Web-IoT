import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import CatalogPage from './components/Catalog-Page/CatalogPage';
import CartPage from './components/Cart-Page/CartPage';
import HomePage from './components/Home-Page/HomePage';
import ItemPage from './components/Item-Page/ItemPage';
import CheckoutPage from './components/FormPages/Checkout-Page/CheckoutPage';
import SuccessPage from './components/FormPages/Success-Page/SuccessPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/item/:id" element={<ItemPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;