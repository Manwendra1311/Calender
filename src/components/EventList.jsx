/* eslint-disable react/prop-types */
const EventList = ({ selectedDay, events, onDeleteEvent }) => {
  if (!selectedDay || events.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-gray-500">No events for the selected day.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Events for {selectedDay.toDateString()}</h3>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="p-2 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <p className="font-medium">{event.eventName}</p>
              <button
                className="text-red-500 hover:underline"
                onClick={() => onDeleteEvent(selectedDay, index)}
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {event.startTime} - {event.endTime}
            </p>
            {event.description && <p className="text-sm mt-1">{event.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
