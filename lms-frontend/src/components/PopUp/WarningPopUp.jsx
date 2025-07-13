import React, { useState } from 'react';
import { FaExclamationTriangle, FaLock } from 'react-icons/fa';

const WarningPopUp = ({ courseTitle, coursePrice, onPurchase, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };

  const handlePurchase = () => {
    setShow(false);
    onPurchase && onPurchase();
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body text-center py-4">
            <div className="mb-4 alert alert-warning border border-warning">
                <p className="mb-0">
                <strong>Note:</strong> To view this course content, please purchase it first.
                </p>
            </div>
          </div>
          
          <div className="modal-footer border-0 d-flex justify-content-center">
            <button 
              type="button" 
              className="btn btn-outline-secondary me-3" 
              onClick={()=>{handleClose}}
            >
              Maybe Later
            </button>
            <button 
              type="button" 
              className="btn btn-purple" 
              onClick={()=>{handlePurchase}}
            >
              Purchase Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningPopUp;