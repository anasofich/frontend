import React, { useEffect, useState } from "react";
import { fetchUserActivities } from "../../services/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/slices/userSlice";

interface CalendarMonthProps {
  selectedDay: Date;
  onSelectDay: (day: Date) => void;
  currentDate: Date; // New prop to dynamically render the selected month's calendar
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ selectedDay, onSelectDay, currentDate }) => {
  const [activities, setActivities] = useState<any[]>([]);
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
    const fetchActivitiesData = async () => {
      try {
        const data = await fetchUserActivities(user.currentUser?._id || "");
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivitiesData();
  }, [user.currentUser?._id]);

  // Get all days in the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1);

    while (firstDay.getMonth() === month) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }
    return days;
  };

  // Dynamically calculate days for the current month
  const daysInMonth = getDaysInMonth(currentDate);

  const getDayActivities = (date: Date) => {
    return activities.filter((activity) => new Date(activity.date).toDateString() === date.toDateString());
  };

  const renderCalendarGrid = () => {
    const firstDayOfMonth = daysInMonth[0].getDay(); // 0 (Sunday) to 6 (Saturday)
    const leadingEmptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const trailingEmptyCells = Array.from({ length: 6 - daysInMonth[daysInMonth.length - 1].getDay() }, (_, i) => i);

    const allDays = [...leadingEmptyCells.map(() => null), ...daysInMonth, ...trailingEmptyCells.map(() => null)];

    return allDays.map((day, index) => {
      if (day === null) {
        return <div key={index} className="calendarEmptyCell" />;
      }

      const dayActivities = getDayActivities(day);
      const isToday = day.toDateString() === new Date().toDateString();

      return (
        <div key={day.toDateString()} className={`calendarDay ${day.toDateString() === selectedDay.toDateString() ? "selected" : ""}`} onClick={() => onSelectDay(day)}>
          <span className={isToday ? "today" : ""}>{day.getDate()}</span>
          <div className="icons">
            {dayActivities.map((activity) => (
              <div className="activityBg">
                <img key={activity._id} src={typeToIconMap[activity.type]} alt={activity.type} title={activity.type} />
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="calendarMonth">
      <div className="calendarHeader">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="calendarHeaderCell">
            <h4>{day}</h4>
          </div>
        ))}
      </div>
      <div className="calendarGrid">{renderCalendarGrid()}</div>
    </div>
  );
};

export default CalendarMonth;
