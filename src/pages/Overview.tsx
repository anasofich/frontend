import React from "react";
import ActivitiesList from "../components/Overview/ActivitiesList";

const Overview: React.FC = () => {
  // Dummy data for activities
  const activities = [
    {
      icon: "./media/graphics/svg/Medicine.svg",
      day: "Today",
      time: "12:30",
      title: "Take Naloxone",
    },
    {
      icon: "./media/graphics/svg/appointment.svg",
      day: "Tomorrow",
      time: "09:00",
      title: "Physical therapy",
    },
    {
      icon: "./media/graphics/svg/food.svg",
      day: "Nov 3",
      time: "8:30",
      title: "Breakfast",
    },
    {
      icon: "./media/graphics/svg/Medicine.svg",
      day: "Nov 3",
      time: "13:00",
      title: "Take Citalopram",
    },
  ];

  return (
    <div className="overviewContent" style={{ padding: "30px" }}>
      <div className="top">
        <p>Hello</p>
        <h1 className="name">Maria</h1>
      </div>
      <div className="bottom">
        <div className="upcomingActivities">
          <h3>Upcoming activities</h3>
          <ActivitiesList activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
