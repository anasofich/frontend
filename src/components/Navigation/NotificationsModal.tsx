import React from "react";

type NotificationsModalProps = {
  onClose: () => void;
};

const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
      {/* Modal Content */}
      <div className="modal-container">
        <h2>Notifications</h2>
        <p>This is where you can display notifications content.</p>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default NotificationsModal;
