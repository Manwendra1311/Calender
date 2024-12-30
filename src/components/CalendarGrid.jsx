/* eslint-disable react/prop-types */
import { useState } from "react";
import { generateMonthDays, formatDate } from "../utils/dateUtils";
import EventModal from "./EventModal";
import EventList from "./EventList";
import styles from "../styles/CalenderGrid.module.css";

const CalendarGrid = ({ currentDate, setCurrentDate, events, onAddEvent, onDeleteEvent }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = generateMonthDays(currentDate);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (day) => {
    return (
      selectedDay &&
      day.getDate() === selectedDay.getDate() &&
      day.getMonth() === selectedDay.getMonth() &&
      day.getFullYear() === selectedDay.getFullYear()
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          className={styles.button}
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
        >
          Previous
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button
          className={styles.button}
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 m-5">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-bold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={formatDate(day)}
            className={`border rounded p-2 cursor-pointer hover:bg-gray-200 ${
              isToday(day) ? styles.highlight : ""
            } ${isSelectedDay(day) ? styles.selected : ""}`}
            onClick={() => handleDayClick(day)}
          >
            <p>{day.getDate()}</p>
            {events[formatDate(day)] && <p className="text-sm text-red-500">Events: {events[formatDate(day)].length}</p>}
          </div>
        ))}
      </div>

      {modalOpen && (
        <EventModal
          selectedDay={selectedDay}
          onAddEvent={(event) => {
            onAddEvent(selectedDay, event);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}

      <EventList selectedDay={selectedDay} events={events[formatDate(selectedDay)] || []} onDeleteEvent={onDeleteEvent} />
    </div>
  );
};

export default CalendarGrid;
