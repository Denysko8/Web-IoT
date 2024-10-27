import React from 'react';
import './footer.css';
import logo from '../images/logo.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="branding">
                    <h3>In Rainsongs</h3>
                </div>
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
            <hr />
            <div className="copyright">
                <p>2024 IoT © Copyright all rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;