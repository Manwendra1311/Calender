
import "./App.css"
import { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import { formatDate } from "./utils/dateUtils";
import { loadEvents, saveEvents } from "./utils/storageUtils";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(loadEvents());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddEvent = (date, event) => {
    const formattedDate = formatDate(date);
    const updatedEvents = {
      ...events,
      [formattedDate]: [...(events[formattedDate] || []), event],
    };
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  const handleDeleteEvent = (date, eventIndex) => {
    const formattedDate = formatDate(date);
    const updatedEvents = { ...events };
    updatedEvents[formattedDate].splice(eventIndex, 1);
    if (updatedEvents[formattedDate].length === 0) delete updatedEvents[formattedDate];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 root">
      <h1 className="text-2xl font-bold text-center mb-4">Dynamic Event Calendar</h1>
      <CalendarGrid
        currentDate={currentDate}
        events={events}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default App;
