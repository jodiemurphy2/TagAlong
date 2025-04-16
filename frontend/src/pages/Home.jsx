import React, { useState, useEffect } from 'react';
import { getEvents, searchEvents, tagAlong } from '../services/api'; // Correct imports

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        
        //debugging
        console.log("Full response from getEvents:", response);

        setEvents(response.content || []);
      } catch (err) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchEvents();
    }, []);

    const handleTagAlong = async (eventId) => {
        try {
          await tagAlong(eventId);
          fetchEvents(); // Reload all events
        } catch (err) {
          console.error(err);
          alert('Failed to tag along');
        }
      };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let result;
      //searchQuery && category && date
      if (searchQuery || category || date) {
        result = await searchEvents(searchQuery, category, date);
      } else {
        result = await searchEvents();
      }

      setEvents(result.data.content || result.data || []);
    } catch (err) {
      setError('Failed to search events');
      console.error(err);
    }
  };

  const handleClearSearch = async () => {
    setSearchQuery('');
    setCategory('');
    setDate('');
    fetchEvents(); // Reload all events
  };

  return (
    <div>
      <h2>Events</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search events by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear Search</button>
      </form>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="event-list" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="event-card" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Attendees:</strong> {event.attendeeEmails?.join(", ")}</p>
                <button onClick={() => handleTagAlong(event.id)}>Tag-Along</button>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;