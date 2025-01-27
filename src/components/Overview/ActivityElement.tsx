import React, { useState } from "react";
import ActivityModal from "./ActivityModal";

interface ActivityElementProps {
  _id: string; // Unique identifier
  icon: string; // Path to the icon
  formattedDate: string; // Formatted date here
  date: string; // Store original date for editing
  time: string; // Time (e.g., "12:30")
  title: string; // Activity title (e.g., "Take Naloxone")
  notes?: string; // Additional notes (optional)
  status: string; // Status of the activity (e.g., "pending")
  className?: string;
  statusText?: string;
}

const ActivityElement: React.FC<ActivityElementProps> = ({ _id, icon, formattedDate, date, time, title, notes, status, className, statusText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define handlers for modal actions
  const handleUpdateActivity = (_id: string, updatedData: { title?: string; notes?: string; status?: string }) => {
    console.log("Updating activity:", _id, updatedData);
    // Implement the logic to update the activity
  };

  const handleDeleteActivity = (_id: string) => {
    console.log("Deleting activity:", _id);
    // Implement the logic to delete the activity
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("Opening modal for activity:", _id);
  };

  return (
    <div>
      <div className={`activityElement ${className}`} key={_id} onClick={handleOpenModal} style={{ cursor: "pointer" }}>
        <div className="left">
          <div className="icon">
            <img src={icon} alt={`${title} icon`} />
          </div>
          <div className="content">
            <div className="date">
              <span className="activityDay">{formattedDate}</span>
              <span className="activityTime">{time}</span>
            </div>
            <h4 className="activityTitle">{title}</h4>
            {statusText && <p className={`activityStatus ${className}`}>{statusText}</p>}
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.95463 16.1594C5.74372 15.9484 5.62524 15.6623 5.62524 15.364C5.62524 15.0657 5.74372 14.7796 5.95463 14.5686L11.5234 8.99988L5.95463 3.43113C5.7497 3.21896 5.63631 2.93478 5.63887 2.63981C5.64143 2.34484 5.75975 2.06267 5.96833 1.85409C6.17692 1.6455 6.45908 1.52719 6.75405 1.52462C7.04902 1.52206 7.3332 1.63546 7.54538 1.84038L13.9095 8.20451C14.1204 8.41548 14.2389 8.70157 14.2389 8.99988C14.2389 9.29819 14.1204 9.58429 13.9095 9.79526L7.54538 16.1594C7.33441 16.3703 7.04831 16.4888 6.75 16.4888C6.45169 16.4888 6.1656 16.3703 5.95463 16.1594Z"
            fill="#898890"
          />
        </svg>
      </div>
      {isModalOpen && (
        <ActivityModal
          _id={_id} // Pass id as string
          formattedDate={formattedDate}
          date={date}
          time={time}
          title={title}
          notes={notes ?? ""}
          status={status}
          onClose={() => setIsModalOpen(false)}
          onUpdateActivity={handleUpdateActivity} // Pass handler
          onDeleteActivity={handleDeleteActivity} // Pass handler
        />
      )}
    </div>
  );
};

export default ActivityElement;
