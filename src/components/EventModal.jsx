/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "../styles/EventModal.module.css";

const EventModal = ({ selectedDay, onAddEvent, onClose }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAdd = () => {
    if (eventName && startTime && endTime) {
      onAddEvent({ eventName, startTime, endTime });
    }
    onClose();
  };

  return (
    <div className={styles.modal_wrap}>
      <h3>Add Event</h3>
      <input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <div className={styles.wrap}>
        <button onClick={handleAdd} className={styles.button}>Add</button>
        <button onClick={onClose} className={styles.button}>Close</button>
      </div>
    </div>
  );
};

export default EventModal;
