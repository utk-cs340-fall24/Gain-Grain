// Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './modal.css'; // Make sure to create and style this CSS file

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
