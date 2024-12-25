import React, { useEffect } from "react";
import ActivitiesList from "../components/Overview/ActivitiesList";
import { fetchUserActivities } from "../services/api";

const Overview: React.FC = () => {
  const [activities, setActivities] = React.useState<any[]>([]);
  const userId = "676a5112c2fadf3c1e98793c";
  // Dummy data for activities
  /* const activities = [
    {
      id: 1,
      icon: "./media/graphics/svg/medicine.svg",
      day: "Today",
      time: "12:30",
      title: "Take Naloxone",
      notes: "Take 1 dose",
      status: "pending",
    },
    {
      id: 2,
      icon: "./media/graphics/svg/appointment.svg",
      day: "Tomorrow",
      time: "09:00",
      title: "Physical therapy",
      notes: "Come 15 minues earlier",
      status: "pending",
    },
    {
      id: 3,
      icon: "./media/graphics/svg/food.svg",
      day: "Nov 3",
      time: "8:30",
      title: "Breakfast",
      notes: "",
      status: "pending",
    },
    {
      id: 4,
      icon: "./media/graphics/svg/medicine.svg",
      day: "Nov 3",
      time: "13:00",
      title: "Take Citalopram",
      notes: "Take 1/2 a dose",
      status: "pending",
    },
    {
      id: 4,
      icon: "./media/graphics/svg/medicine.svg",
      day: "Nov 3",
      time: "13:00",
      title: "Take Citalopram",
      notes: "Take 1/2 a dose",
      status: "pending",
    },
  ]; */

  const typeToIconMap: { [key: string]: string } = {
    appointment: "./media/graphics/svg/appointment.svg",
    bloodCell: "./media/graphics/svg/blood-cell.svg",
    food: "./media/graphics/svg/food.svg",
    glucose: "./media/graphics/svg/glucose.svg",
    heart: "./media/graphics/svg/heart.svg",
    medicine: "./media/graphics/svg/medicine.svg",
    toilet: "./media/graphics/svg/toilet.svg",
    water: "./media/graphics/svg/water.svg",
    weight: "./media/graphics/svg/weight.svg",
    exercise: "./media/graphics/svg/exercise.svg",
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await fetchUserActivities(userId);

        // Get today's and tomorrow's dates
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const formatDate = (dateString: string) => {
          const activityDate = new Date(dateString);
          if (activityDate.toDateString() === today.toDateString()) {
            return "Today";
          }
          if (activityDate.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
          }
          return activityDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        };

        const formatTime24Hour = (dateString: string) => {
          const activityDate = new Date(dateString);
          return activityDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        };

        const enrichedData = data.map((activity: any) => ({
          ...activity,
          icon: typeToIconMap[activity.type] || "./media/graphics/svg/medicine.svg",
          date: formatDate(activity.date),
          time: formatTime24Hour(activity.date),
        }));
        setActivities(enrichedData);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [userId]);

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
        <div className="favorites">
          <h3>Favorites</h3>
          <div className="favoritesElementSmall">
            <div className="left">
              <div className="icon">
                <img src="./media/graphics/svg/glucose.svg" alt="icon"></img>
              </div>
              <div className="info">
                <h4>Glucose: 5.9 mmol/L</h4>
                <p>You're on good state!</p>
              </div>
            </div>
            <div className="right">
              <p>7:00</p>
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.95463 16.6594C5.74372 16.4484 5.62524 16.1623 5.62524 15.864C5.62524 15.5657 5.74372 15.2796 5.95463 15.0686L11.5234 9.49988L5.95463 3.93113C5.7497 3.71896 5.63631 3.43478 5.63887 3.13981C5.64143 2.84484 5.75975 2.56267 5.96833 2.35409C6.17692 2.1455 6.45908 2.02719 6.75405 2.02462C7.04902 2.02206 7.3332 2.13546 7.54538 2.34038L13.9095 8.70451C14.1204 8.91548 14.2389 9.20157 14.2389 9.49988C14.2389 9.79819 14.1204 10.0843 13.9095 10.2953L7.54538 16.6594C7.33441 16.8703 7.04831 16.9888 6.75 16.9888C6.45169 16.9888 6.1656 16.8703 5.95463 16.6594Z"
                  fill="#898890"
                />
              </svg>
            </div>
          </div>
          <div className="favoritesElementSmall">
            <div className="left">
              <div className="icon">
                <img src="./media/graphics/svg/medicine.svg" alt="icon"></img>
              </div>
              <div className="info">
                <h4>Medicines</h4>
                <p>You have medicines to take today</p>
              </div>
            </div>
            <div className="right">
              <p>7:00</p>
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.95463 16.6594C5.74372 16.4484 5.62524 16.1623 5.62524 15.864C5.62524 15.5657 5.74372 15.2796 5.95463 15.0686L11.5234 9.49988L5.95463 3.93113C5.7497 3.71896 5.63631 3.43478 5.63887 3.13981C5.64143 2.84484 5.75975 2.56267 5.96833 2.35409C6.17692 2.1455 6.45908 2.02719 6.75405 2.02462C7.04902 2.02206 7.3332 2.13546 7.54538 2.34038L13.9095 8.70451C14.1204 8.91548 14.2389 9.20157 14.2389 9.49988C14.2389 9.79819 14.1204 10.0843 13.9095 10.2953L7.54538 16.6594C7.33441 16.8703 7.04831 16.9888 6.75 16.9888C6.45169 16.9888 6.1656 16.8703 5.95463 16.6594Z"
                  fill="#898890"
                />
              </svg>
            </div>
          </div>
          <div className="bigElements">
            <div className="favoritesElementBig">
              <div className="title">
                <img src="./media/graphics/svg/toilet.svg" alt="icon"></img>
                <p>Bowel movement</p>
              </div>
              <h1>2</h1>
              <div className="timeStamp">
                <p>16:00</p>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.95463 16.6594C5.74372 16.4484 5.62524 16.1623 5.62524 15.864C5.62524 15.5657 5.74372 15.2796 5.95463 15.0686L11.5234 9.49988L5.95463 3.93113C5.7497 3.71896 5.63631 3.43478 5.63887 3.13981C5.64143 2.84484 5.75975 2.56267 5.96833 2.35409C6.17692 2.1455 6.45908 2.02719 6.75405 2.02462C7.04902 2.02206 7.3332 2.13546 7.54538 2.34038L13.9095 8.70451C14.1204 8.91548 14.2389 9.20157 14.2389 9.49988C14.2389 9.79819 14.1204 10.0843 13.9095 10.2953L7.54538 16.6594C7.33441 16.8703 7.04831 16.9888 6.75 16.9888C6.45169 16.9888 6.1656 16.8703 5.95463 16.6594Z"
                    fill="#898890"
                  />
                </svg>
              </div>
            </div>
            <div className="favoritesElementBig">
              <div className="title">
                <img src="./media/graphics/svg/heart.svg" alt="icon"></img>
                <p>Heart rate</p>
              </div>
              <h1>60</h1>
              <div className="timeStamp">
                <p>BPM</p>
                <div className="timeStamp">
                  <p>12:15</p>
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.95463 16.6594C5.74372 16.4484 5.62524 16.1623 5.62524 15.864C5.62524 15.5657 5.74372 15.2796 5.95463 15.0686L11.5234 9.49988L5.95463 3.93113C5.7497 3.71896 5.63631 3.43478 5.63887 3.13981C5.64143 2.84484 5.75975 2.56267 5.96833 2.35409C6.17692 2.1455 6.45908 2.02719 6.75405 2.02462C7.04902 2.02206 7.3332 2.13546 7.54538 2.34038L13.9095 8.70451C14.1204 8.91548 14.2389 9.20157 14.2389 9.49988C14.2389 9.79819 14.1204 10.0843 13.9095 10.2953L7.54538 16.6594C7.33441 16.8703 7.04831 16.9888 6.75 16.9888C6.45169 16.9888 6.1656 16.8703 5.95463 16.6594Z"
                      fill="#898890"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="showAll lightBlue">
            <h4>Show all</h4>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.95463 16.1594C5.74372 15.9484 5.62524 15.6623 5.62524 15.364C5.62524 15.0657 5.74372 14.7796 5.95463 14.5686L11.5234 8.99988L5.95463 3.43113C5.7497 3.21896 5.63631 2.93478 5.63887 2.63981C5.64143 2.34484 5.75975 2.06267 5.96833 1.85409C6.17692 1.6455 6.45908 1.52719 6.75405 1.52462C7.04902 1.52206 7.3332 1.63546 7.54538 1.84038L13.9095 8.20451C14.1204 8.41548 14.2389 8.70157 14.2389 8.99988C14.2389 9.29819 14.1204 9.58429 13.9095 9.79526L7.54538 16.1594C7.33441 16.3703 7.04831 16.4888 6.75 16.4888C6.45169 16.4888 6.1656 16.3703 5.95463 16.1594Z"
                fill="#898890"
              />
            </svg>
          </div>
        </div>
        <div className="rightColumn">
          <div className="location">
            <h3>Your current location</h3>
            <div className="map"></div>
          </div>
          <div className="post">
            <div className="top">
              <h2>
                How are you feeling
                <br /> today?
              </h2>
              <h4>
                Share how you are feeling today <br /> with your community
              </h4>
            </div>
            <div className="bottom">
              <button className="mainButton">
                <h4>Share a post</h4>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.95463 1.84062C5.74372 2.05158 5.62524 2.33768 5.62524 2.63599C5.62524 2.9343 5.74372 3.2204 5.95463 3.43137L11.5234 9.00012L5.95463 14.5689C5.7497 14.781 5.63631 15.0652 5.63887 15.3602C5.64143 15.6552 5.75975 15.9373 5.96833 16.1459C6.17692 16.3545 6.45908 16.4728 6.75405 16.4754C7.04902 16.4779 7.3332 16.3645 7.54538 16.1596L13.9095 9.79549C14.1204 9.58452 14.2389 9.29843 14.2389 9.00012C14.2389 8.70181 14.1204 8.41571 13.9095 8.20474L7.54538 1.84062C7.33441 1.62971 7.04831 1.51123 6.75 1.51123C6.45169 1.51123 6.1656 1.62971 5.95463 1.84062Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
