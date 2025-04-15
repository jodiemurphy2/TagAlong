import React from "react";

const EventCard = ({ event }) => {
  return (
    <div>
      <h3>{event.name}</h3>
      <p>{event.category}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventCard;