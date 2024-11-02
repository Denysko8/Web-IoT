import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ children }) => {
    return <div className="error-message">{children}</div>;
};

ErrorMessage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorMessage;
