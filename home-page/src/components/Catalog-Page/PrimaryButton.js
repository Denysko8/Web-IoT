import React from 'react';

const PrimaryButton = ({ onClick, children }) => {
    return (
        <button className="primary-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default PrimaryButton;
