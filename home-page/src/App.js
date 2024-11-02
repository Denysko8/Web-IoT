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
import LoginPage from './components/Authentication/Login-Page/LoginPage';
import RegisterPage from './components/Authentication/Register-Page/RegisterPage';
import ProtectedRoute from './components/Authentication/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/catalog" element={<ProtectedRoute><CatalogPage /></ProtectedRoute>} />
                        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                        <Route path="/item/:id" element={<ProtectedRoute><ItemPage /></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;