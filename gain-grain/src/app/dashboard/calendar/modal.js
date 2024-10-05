import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './modal.css'; // Ensure to style this CSS file

const Modal = ({ show, onClose, children }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true); // Start the closing animation
        setTimeout(() => {
            onClose(); // Close the modal after animation finishes
            setIsClosing(false); // Reset closing state
        }, 250); // Match the timeout to animation duration (0.5s)
    };

    if (!show && !isClosing) return null; // Don't render if modal is not shown and not in the process of closing

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isClosing ? 'modal-close-animation' : 'modal-open-animation'}`}>
                <button className="modal-close" onClick={handleClose}>
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
