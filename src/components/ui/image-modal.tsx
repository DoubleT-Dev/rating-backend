import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // Dynamic content
    title?: string; // Optional title for the modal
}

const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                {title && <h2>{title}</h2>}
                <div className="modal-body">
                    {children} {/* Dynamic content passed here */}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
