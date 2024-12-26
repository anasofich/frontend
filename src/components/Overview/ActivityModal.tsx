import React, { useState } from "react";
import { updateActivity, deleteActivity } from "../../services/api";

interface ActivityModalProps {
  _id: string; // Unique identifier for the activity
  formattedDate: string;
  originalDate: string;
  time: string;
  title: string;
  notes: string;
  status: string; // Added for status management
  onClose: () => void;
  onUpdateActivity: (_id: string, updatedData: { title?: string; notes?: string; status?: string }) => void; // Function to update the activity
  onDeleteActivity: (_id: string) => void; // Function to delete the activity
}

const ActivityModal: React.FC<ActivityModalProps> = ({ _id, formattedDate, originalDate, time, title, notes, status, onClose, onUpdateActivity, onDeleteActivity }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    title,
    notes,
    formattedDate,
    originalDate,
    time,
  });
  const [showDoneElement, setShowDoneElement] = useState(status === "completed");

  // Handle updates to the activity
  const handleMarkAsCompleted = async () => {
    try {
      await updateActivity(_id, { status: "completed" });
      onUpdateActivity(_id, { status: "completed" });
      setShowDoneElement(true);
      console.log("Activity marked as completed", _id);
    } catch (error) {
      console.error("Error marking activity as completed:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateActivity(_id, editData);
      onUpdateActivity(_id, editData);
      setShowEditModal(false);
      console.log("Activity updated:", _id, editData);
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActivity(_id);
      onDeleteActivity(_id);
      setShowDeleteConfirmation(false);
      setShowDeletedModal(true);
      setShowEditModal(false);
      setShowDoneElement(false); // Optional: Reset completed status
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="activityModal">
      <div className="modalContent">
        <button className="rectangularButton close" onClick={onClose}>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.8921 10.5L15.7886 6.60351C15.9735 6.41891 16.0775 6.16841 16.0777 5.90712C16.078 5.64582 15.9744 5.39514 15.7898 5.21021C15.6052 5.02529 15.3547 4.92127 15.0934 4.92104C14.8321 4.92081 14.5814 5.02438 14.3965 5.20898L10.5 9.10547L6.60351 5.20898C6.41859 5.02406 6.16777 4.92017 5.90625 4.92017C5.64472 4.92017 5.39391 5.02406 5.20898 5.20898C5.02406 5.39391 4.92017 5.64472 4.92017 5.90625C4.92017 6.16777 5.02406 6.41859 5.20898 6.60351L9.10547 10.5L5.20898 14.3965C5.02406 14.5814 4.92017 14.8322 4.92017 15.0937C4.92017 15.3553 5.02406 15.6061 5.20898 15.791C5.39391 15.9759 5.64472 16.0798 5.90625 16.0798C6.16777 16.0798 6.41859 15.9759 6.60351 15.791L10.5 11.8945L14.3965 15.791C14.5814 15.9759 14.8322 16.0798 15.0937 16.0798C15.3553 16.0798 15.6061 15.9759 15.791 15.791C15.9759 15.6061 16.0798 15.3553 16.0798 15.0937C16.0798 14.8322 15.9759 14.5814 15.791 14.3965L11.8921 10.5Z"
              fill="#202124"
            />
          </svg>
        </button>
        <div className="activityDetails">
          <div className="titleEdit">
            <h3>{title}</h3>
            <button onClick={() => setShowEditModal(true)}>Edit</button>
          </div>
          <div className="date">
            <p>{formattedDate}</p>
            <p>{time}</p>
          </div>
          <div className="notes">
            <h4>Notes:</h4>

            <div className="notesContent">
              <p>{notes}</p>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        {/* Conditional Render based on status */}
        {!showDoneElement ? (
          <>
            {!showDeleteConfirmation && status !== "completed" && (
              <div className="modalActions">
                <button className="rectangularButton" onClick={() => setShowDeleteConfirmation(true)}>
                  <h4>Delete</h4>
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.8921 11L15.7886 7.10351C15.9735 6.91891 16.0775 6.66841 16.0777 6.40712C16.078 6.14582 15.9744 5.89514 15.7898 5.71021C15.6052 5.52529 15.3547 5.42127 15.0934 5.42104C14.8321 5.42081 14.5814 5.52438 14.3965 5.70898L10.5 9.60547L6.60351 5.70898C6.41859 5.52406 6.16777 5.42017 5.90625 5.42017C5.64472 5.42017 5.39391 5.52406 5.20898 5.70898C5.02406 5.89391 4.92017 6.14472 4.92017 6.40625C4.92017 6.66777 5.02406 6.91859 5.20898 7.10351L9.10547 11L5.20898 14.8965C5.02406 15.0814 4.92017 15.3322 4.92017 15.5937C4.92017 15.8553 5.02406 16.1061 5.20898 16.291C5.39391 16.4759 5.64472 16.5798 5.90625 16.5798C6.16777 16.5798 6.41859 16.4759 6.60351 16.291L10.5 12.3945L14.3965 16.291C14.5814 16.4759 14.8322 16.5798 15.0937 16.5798C15.3553 16.5798 15.6061 16.4759 15.791 16.291C15.9759 16.1061 16.0798 15.8553 16.0798 15.5937C16.0798 15.3322 15.9759 15.0814 15.791 14.8965L11.8921 11Z"
                      fill="#F59393"
                    />
                  </svg>
                </button>
                {status !== "completed" && (
                  <button className="rectangularButton" onClick={handleMarkAsCompleted}>
                    <h4>Mark as done</h4>
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 6.625L8.75 15.375L4.375 11" stroke="#83C56B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="doneButtons">
            <div className="doneMessage rectangularButton">
              <h4>Done</h4>
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 6.625L8.75 15.375L4.375 11" stroke="#83C56B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <button className="rectangularButton close" onClick={onClose}>
              <h4>Close</h4>
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.8921 11L15.7886 7.10351C15.9735 6.91891 16.0775 6.66841 16.0777 6.40712C16.078 6.14582 15.9744 5.89514 15.7898 5.71021C15.6052 5.52529 15.3547 5.42127 15.0934 5.42104C14.8321 5.42081 14.5814 5.52438 14.3965 5.70898L10.5 9.60547L6.60351 5.70898C6.41859 5.52406 6.16777 5.42017 5.90625 5.42017C5.64472 5.42017 5.39391 5.52406 5.20898 5.70898C5.02406 5.89391 4.92017 6.14472 4.92017 6.40625C4.92017 6.66777 5.02406 6.91859 5.20898 7.10351L9.10547 11L5.20898 14.8965C5.02406 15.0814 4.92017 15.3322 4.92017 15.5937C4.92017 15.8553 5.02406 16.1061 5.20898 16.291C5.39391 16.4759 5.64472 16.5798 5.90625 16.5798C6.16777 16.5798 6.41859 16.4759 6.60351 16.291L10.5 12.3945L14.3965 16.291C14.5814 16.4759 14.8322 16.5798 15.0937 16.5798C15.3553 16.5798 15.6061 16.4759 15.791 16.291C15.9759 16.1061 16.0798 15.8553 16.0798 15.5937C16.0798 15.3322 15.9759 15.0814 15.791 14.8965L11.8921 11Z"
                  fill="#F59393"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirmation && (
          <div className="deleteConfirmation">
            <h4>Delete activity</h4>
            <p>Are you sure you want to delete this activity?</p>
            <div className="confirmationActions">
              <button className="rectangularButton" onClick={() => setShowDeleteConfirmation(false)}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.34698 11.875L11.6345 16.1625C11.8095 16.3375 11.8935 16.5416 11.8865 16.775C11.8795 17.0083 11.7882 17.2125 11.6126 17.3875C11.4376 17.5479 11.2334 17.6319 11.0001 17.6395C10.7668 17.647 10.5626 17.563 10.3876 17.3875L4.61261 11.6125C4.52511 11.525 4.46298 11.4302 4.42623 11.3281C4.38948 11.226 4.37169 11.1166 4.37286 11C4.37402 10.8833 4.3924 10.7739 4.42798 10.6718C4.46356 10.5697 4.5254 10.475 4.61348 10.3875L10.3885 4.61245C10.5489 4.45203 10.7496 4.37183 10.9905 4.37183C11.2314 4.37183 11.4391 4.45203 11.6135 4.61245C11.7885 4.78745 11.876 4.99541 11.876 5.23633C11.876 5.47724 11.7885 5.68491 11.6135 5.85933L7.34698 10.125H17.1251C17.373 10.125 17.581 10.209 17.749 10.377C17.917 10.545 18.0007 10.7526 18.0001 11C17.9995 11.2473 17.9155 11.4552 17.7481 11.6238C17.5807 11.7924 17.373 11.8761 17.1251 11.875H7.34698Z"
                    fill="#202124"
                  />
                </svg>

                <h4>Go back</h4>
              </button>
              <button className="rectangularButton" onClick={handleDelete}>
                <h4>Delete</h4>
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.8921 11L15.7886 7.10351C15.9735 6.91891 16.0775 6.66841 16.0777 6.40712C16.078 6.14582 15.9744 5.89514 15.7898 5.71021C15.6052 5.52529 15.3547 5.42127 15.0934 5.42104C14.8321 5.42081 14.5814 5.52438 14.3965 5.70898L10.5 9.60547L6.60351 5.70898C6.41859 5.52406 6.16777 5.42017 5.90625 5.42017C5.64472 5.42017 5.39391 5.52406 5.20898 5.70898C5.02406 5.89391 4.92017 6.14472 4.92017 6.40625C4.92017 6.66777 5.02406 6.91859 5.20898 7.10351L9.10547 11L5.20898 14.8965C5.02406 15.0814 4.92017 15.3322 4.92017 15.5937C4.92017 15.8553 5.02406 16.1061 5.20898 16.291C5.39391 16.4759 5.64472 16.5798 5.90625 16.5798C6.16777 16.5798 6.41859 16.4759 6.60351 16.291L10.5 12.3945L14.3965 16.291C14.5814 16.4759 14.8322 16.5798 15.0937 16.5798C15.3553 16.5798 15.6061 16.4759 15.791 16.291C15.9759 16.1061 16.0798 15.8553 16.0798 15.5937C16.0798 15.3322 15.9759 15.0814 15.791 14.8965L11.8921 11Z"
                    fill="#F59393"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Deleted Modal */}
        {showDeletedModal && (
          <div className="deletedModal">
            <h4>Request sent</h4>
            <p>A member of the staff will review your request</p>
            <button className="rectangularButton" onClick={onClose}>
              <h4>Close</h4>
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.8921 11L15.7886 7.10351C15.9735 6.91891 16.0775 6.66841 16.0777 6.40712C16.078 6.14582 15.9744 5.89514 15.7898 5.71021C15.6052 5.52529 15.3547 5.42127 15.0934 5.42104C14.8321 5.42081 14.5814 5.52438 14.3965 5.70898L10.5 9.60547L6.60351 5.70898C6.41859 5.52406 6.16777 5.42017 5.90625 5.42017C5.64472 5.42017 5.39391 5.52406 5.20898 5.70898C5.02406 5.89391 4.92017 6.14472 4.92017 6.40625C4.92017 6.66777 5.02406 6.91859 5.20898 7.10351L9.10547 11L5.20898 14.8965C5.02406 15.0814 4.92017 15.3322 4.92017 15.5937C4.92017 15.8553 5.02406 16.1061 5.20898 16.291C5.39391 16.4759 5.64472 16.5798 5.90625 16.5798C6.16777 16.5798 6.41859 16.4759 6.60351 16.291L10.5 12.3945L14.3965 16.291C14.5814 16.4759 14.8322 16.5798 15.0937 16.5798C15.3553 16.5798 15.6061 16.4759 15.791 16.291C15.9759 16.1061 16.0798 15.8553 16.0798 15.5937C16.0798 15.3322 15.9759 15.0814 15.791 14.8965L11.8921 11Z"
                  fill="#F59393"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="editModal">
            <div className="modalContent">
              <h3>Edit Activity</h3>
              <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Edit title" />
              <textarea value={editData.notes} onChange={(e) => setEditData({ ...editData, notes: e.target.value })} placeholder="Edit notes"></textarea>

              {/* Date Field */}
              <div className="dateTimeContainer">
                <div className="dateField">
                  <h4>Date</h4>
                  <input type="date" value={editData.originalDate} onChange={(e) => setEditData({ ...editData, originalDate: e.target.value })} />
                </div>

                {/* Time Field */}
                <div className="timeField">
                  <h4>Time</h4>
                  <input type="time" value={editData.time} onChange={(e) => setEditData({ ...editData, time: e.target.value })} />
                </div>
              </div>

              <div className="modalActions">
                <button className="rectangularButton" onClick={() => setShowEditModal(false)}>
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.8921 11L15.7886 7.10351C15.9735 6.91891 16.0775 6.66841 16.0777 6.40712C16.078 6.14582 15.9744 5.89514 15.7898 5.71021C15.6052 5.52529 15.3547 5.42127 15.0934 5.42104C14.8321 5.42081 14.5814 5.52438 14.3965 5.70898L10.5 9.60547L6.60351 5.70898C6.41859 5.52406 6.16777 5.42017 5.90625 5.42017C5.64472 5.42017 5.39391 5.52406 5.20898 5.70898C5.02406 5.89391 4.92017 6.14472 4.92017 6.40625C4.92017 6.66777 5.02406 6.91859 5.20898 7.10351L9.10547 11L5.20898 14.8965C5.02406 15.0814 4.92017 15.3322 4.92017 15.5937C4.92017 15.8553 5.02406 16.1061 5.20898 16.291C5.39391 16.4759 5.64472 16.5798 5.90625 16.5798C6.16777 16.5798 6.41859 16.4759 6.60351 16.291L10.5 12.3945L14.3965 16.291C14.5814 16.4759 14.8322 16.5798 15.0937 16.5798C15.3553 16.5798 15.6061 16.4759 15.791 16.291C15.9759 16.1061 16.0798 15.8553 16.0798 15.5937C16.0798 15.3322 15.9759 15.0814 15.791 14.8965L11.8921 11Z"
                      fill="#F59393"
                    />
                  </svg>
                  <h4>Cancel</h4>
                </button>
                <button className="rectangularButton" onClick={handleSaveEdit}>
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 6.625L8.75 15.375L4.375 11" stroke="#83C56B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <h4>Save</h4>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityModal;
