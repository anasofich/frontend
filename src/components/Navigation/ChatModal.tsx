import React from "react";

type ChatModalProps = {
  onClose: () => void;
};

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
      {/* Modal Content */}
      <div className="modal-container">
        <h2>Chat</h2>
        <p>This is where the chat content will go.</p>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default ChatModal;
