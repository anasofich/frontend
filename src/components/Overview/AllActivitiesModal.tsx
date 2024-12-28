import React from "react";
import ActivityElement from "./ActivityElement";

interface ActivityModalProps {
  activities: {
    _id: string;
    icon: string;
    formattedDate: string;
    date: string;
    time: string;
    title: string;
    notes?: string;
    status: string;
  }[];
  onClose: () => void;
}

const AllActivitiesModal: React.FC<ActivityModalProps> = ({ activities, onClose }) => {
  const currentDate = new Date();

  return (
    <div className="allActivitesModal">
      <div className="modalContent">
        <button
          className="rectangularButton close"
          onClick={() => {
            onClose();
            window.location.reload();
          }}
        >
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.8921 10.5L15.7886 6.60351C15.9735 6.41891 16.0775 6.16841 16.0777 5.90712C16.078 5.64582 15.9744 5.39514 15.7898 5.21021C15.6052 5.02529 15.3547 4.92127 15.0934 4.92104C14.8321 4.92081 14.5814 5.02438 14.3965 5.20898L10.5 9.10547L6.60351 5.20898C6.41859 5.02406 6.16777 4.92017 5.90625 4.92017C5.64472 4.92017 5.39391 5.02406 5.20898 5.20898C5.02406 5.39391 4.92017 5.64472 4.92017 5.90625C4.92017 6.16777 5.02406 6.41859 5.20898 6.60351L9.10547 10.5L5.20898 14.3965C5.02406 14.5814 4.92017 14.8322 4.92017 15.0937C4.92017 15.3553 5.02406 15.6061 5.20898 15.791C5.39391 15.9759 5.64472 16.0798 5.90625 16.0798C6.16777 16.0798 6.41859 15.9759 6.60351 15.791L10.5 11.8945L14.3965 15.791C14.5814 15.9759 14.8322 16.0798 15.0937 16.0798C15.3553 16.0798 15.6061 15.9759 15.791 15.791C15.9759 15.6061 16.0798 15.3553 16.0798 15.0937C16.0798 14.8322 15.9759 14.5814 15.791 14.3965L11.8921 10.5Z"
              fill="#202124"
            />
          </svg>
        </button>
        <h3>All Activities</h3>
        <div className="allActivitiesList">
          {/* Past activities section */}
          <h4>Past Activities</h4>
          <div className="activitiesList">
            {activities
              .filter((activity) => {
                const activityDateTime = new Date(`${activity.date}T${activity.time}`);
                return activityDateTime < currentDate || activity.status === "completed"; // Filter past completed and pending activities
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date (oldest to newest)
              .map((activity) => (
                <ActivityElement
                  key={activity._id}
                  {...activity}
                  className="pastActivity" // Apply pastActivity class
                  statusText={activity.status === "completed" ? "completed" : "missed"} // Show status accordingly
                />
              ))}
          </div>

          {/* Upcoming activities section */}
          <h4>Upcoming Activities</h4>
          <div className="activitiesList">
            {activities
              .filter((activity) => {
                const activityDateTime = new Date(`${activity.date}T${activity.time}`);
                return activityDateTime >= currentDate && activity.status === "pending"; // Filter upcoming pending activities
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date (oldest to newest)
              .map((activity) => (
                <ActivityElement
                  key={activity._id}
                  {...activity}
                  className="missed" // If pending, apply 'missed' class
                  statusText="pending" // Status text for pending activities
                />
              ))}

            {activities
              .filter((activity) => {
                const activityDateTime = new Date(`${activity.date}T${activity.time}`);
                return activityDateTime >= currentDate && activity.status === "completed"; // Filter upcoming completed activities
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date (oldest to newest)
              .map((activity) => (
                <ActivityElement
                  key={activity._id}
                  {...activity}
                  className="completed" // If completed, apply 'completed' class
                  statusText="completed" // Status text for completed activities
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllActivitiesModal;
