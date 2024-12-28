import React, { useEffect } from "react";
import ActivitiesList from "../components/Overview/ActivitiesList";
import { fetchUserActivities } from "../services/api";
import { useSelector } from "react-redux";
import { selectUser } from "../state/slices/userSlice";

const Overview: React.FC = () => {
  const [activities, setActivities] = React.useState<any[]>([]);
  const user = useSelector(selectUser);

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
        const data = await fetchUserActivities(user.currentUser?._id || "");

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

        const formatTime24Hour = (timeString: string) => {
          // If the timeString is just time, combine it with a default date
          const dateForTime = new Date(`1970-01-01T${timeString}`);
          return dateForTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        };

        const enrichedData = data.map((activity: any) => ({
          ...activity,
          icon: typeToIconMap[activity.type] || "./media/graphics/svg/medicine.svg",
          formattedDate: formatDate(activity.date),
          date: activity.date,
          time: formatTime24Hour(activity.time),
        }));
        setActivities(enrichedData);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [user.currentUser?._id]);

  return (
    <div className="overviewContent" style={{ padding: "30px" }}>
      <div className="top">
        <p>Hello,</p>
        <h1 className="name">{user.currentUser?.fullName}</h1>
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
          <div className="addWidget">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.75 10.5C1.75 5.66738 5.66738 1.75 10.5 1.75C15.3326 1.75 19.25 5.66738 19.25 10.5C19.25 15.3326 15.3326 19.25 10.5 19.25C5.66738 19.25 1.75 15.3326 1.75 10.5ZM10.5 3.5C8.64348 3.5 6.86301 4.2375 5.55025 5.55025C4.2375 6.86301 3.5 8.64348 3.5 10.5C3.5 12.3565 4.2375 14.137 5.55025 15.4497C6.86301 16.7625 8.64348 17.5 10.5 17.5C12.3565 17.5 14.137 16.7625 15.4497 15.4497C16.7625 14.137 17.5 12.3565 17.5 10.5C17.5 8.64348 16.7625 6.86301 15.4497 5.55025C14.137 4.2375 12.3565 3.5 10.5 3.5Z"
                fill="#898890"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.375 6.125C11.375 5.89294 11.2828 5.67038 11.1187 5.50628C10.9546 5.34219 10.7321 5.25 10.5 5.25C10.2679 5.25 10.0454 5.34219 9.88128 5.50628C9.71719 5.67038 9.625 5.89294 9.625 6.125V9.625H6.125C5.89294 9.625 5.67038 9.71719 5.50628 9.88128C5.34219 10.0454 5.25 10.2679 5.25 10.5C5.25 10.7321 5.34219 10.9546 5.50628 11.1187C5.67038 11.2828 5.89294 11.375 6.125 11.375H9.625V14.875C9.625 15.1071 9.71719 15.3296 9.88128 15.4937C10.0454 15.6578 10.2679 15.75 10.5 15.75C10.7321 15.75 10.9546 15.6578 11.1187 15.4937C11.2828 15.3296 11.375 15.1071 11.375 14.875V11.375H14.875C15.1071 11.375 15.3296 11.2828 15.4937 11.1187C15.6578 10.9546 15.75 10.7321 15.75 10.5C15.75 10.2679 15.6578 10.0454 15.4937 9.88128C15.3296 9.71719 15.1071 9.625 14.875 9.625H11.375V6.125Z"
                fill="#898890"
              />
            </svg>

            <p>Add widget</p>
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
