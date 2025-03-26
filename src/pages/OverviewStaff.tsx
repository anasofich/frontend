import React, { useEffect } from "react";
import ActivitiesList from "../components/Overview/ActivitiesList";
import { fetchUserActivities } from "../services/api";
import { useSelector } from "react-redux";
import { selectUser } from "../state/slices/userSlice";

const OverviewStaff: React.FC = () => {
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
          <h3>Staff on shift</h3>
          <div className="staffOnShift">
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 29.png" alt="icon"></img>
                </div>
                <h4>Jeremy</h4>
              </div>
            </div>
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 30.png" alt="icon"></img>
                </div>
                <h4>Jessica</h4>
              </div>
            </div>
          </div>
          <div className="staffOnShift">
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 31.png" alt="icon"></img>
                </div>
                <h4>Alma</h4>
              </div>
            </div>
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 32.png" alt="icon"></img>
                </div>
                <h4>Adam</h4>
              </div>
            </div>
          </div>
          <h3>Scheduled residents today</h3>
          <div className="staffOnShift">
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 33.png" alt="icon"></img>
                </div>
                <h4>Joseph</h4>
              </div>
            </div>
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 34.png" alt="icon"></img>
                </div>
                <h4>Izzy</h4>
              </div>
            </div>
          </div>
          <div className="staffOnShift">
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 35.png" alt="icon"></img>
                </div>
                <h4>Annie</h4>
              </div>
            </div>
            <div className="favoritesElementSmall">
              <div className="left">
                <div>
                  <img src="./media/images/png/Rectangle 28.png" alt="icon"></img>
                </div>
                <h4>Thomas</h4>
              </div>
            </div>
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

export default OverviewStaff;
