import React, { useState, useEffect } from 'react';
import { getMyEvents, deleteEvent, getTaggedEvents } from '../services/api'; // Correct import

const Profile = () => {
  const [events, setEvents] = useState([]);
  const [taggedEvents, setTaggedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const fetchedEvents = await getMyEvents(); // Fetch events from the backend
        setEvents(fetchedEvents.content); // Set the events to state
        console.log("Fetched events:", fetchedEvents);
      } catch (err) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents(); // Call the function to fetch events
  }, []);

  useEffect(() => {
    const fetchTaggedEvents = async () => {
      try {
        const data = await getTaggedEvents();
        setTaggedEvents(data.content);
      } catch (err) {
        setError("Failed to load tagged events");
        console.error( err);
      }finally {
        setLoading(false);
      }
    };
    fetchTaggedEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete the event.');
    }
  };

  if (loading) return <p>Loading your events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>My Created Events</h2>
      {Array.isArray(events) && events.length > 0 ? (
        <div className="event-list" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {events.map((event) => (
            <div key={event.id} className="event-card" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <button onClick={() => handleDelete(event.id)} style={{ marginTop: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
      <h2>Tagged Along Events</h2>
      {taggedEvents.length > 0 ? (
        <div className="event-list" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}> 
          {taggedEvents.map((event) => (
            <div key={event.id} className="event-card" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Attendees:</strong> {event.attendeeEmails?.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming events yet.</p>
      )}
    </div>
  );
};

export default Profile;