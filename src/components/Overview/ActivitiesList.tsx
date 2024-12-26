import React from "react";
import ActivityElement from "./ActivityElement";

interface ActivitiesListProps {
  activities: {
    _id: string;
    icon: string;
    formattedDate: string; // Formatted date
    originalDate: string; // Original date
    time: string;
    title: string;
    notes?: string;
    status: string;
  }[];
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p>No upcoming activities</p>;
  }

  return (
    <div className="activitiesList">
      {activities.map((activity) => (
        <ActivityElement key={activity._id} {...activity} />
      ))}
      <div className="showAll">
        <h4>Show all</h4>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.95463 16.1594C5.74372 15.9484 5.62524 15.6623 5.62524 15.364C5.62524 15.0657 5.74372 14.7796 5.95463 14.5686L11.5234 8.99988L5.95463 3.43113C5.7497 3.21896 5.63631 2.93478 5.63887 2.63981C5.64143 2.34484 5.75975 2.06267 5.96833 1.85409C6.17692 1.6455 6.45908 1.52719 6.75405 1.52462C7.04902 1.52206 7.3332 1.63546 7.54538 1.84038L13.9095 8.20451C14.1204 8.41548 14.2389 8.70157 14.2389 8.99988C14.2389 9.29819 14.1204 9.58429 13.9095 9.79526L7.54538 16.1594C7.33441 16.3703 7.04831 16.4888 6.75 16.4888C6.45169 16.4888 6.1656 16.3703 5.95463 16.1594Z"
            fill="#898890"
          />
        </svg>
      </div>
    </div>
  );
};

export default ActivitiesList;
