// Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './modal.css'; // Make sure to create and style this CSS file

const Modal = ({ show, onClose, children }) => {
    if (!show) return null; // Don't render the modal if `show` is false

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <FaTimes className="modal-close" onClick={onClose}/> {/* Close button */}
                {children} {/* Render the children passed to Modal */}
            </div>
        </div>
    );
};

export default Modal;
