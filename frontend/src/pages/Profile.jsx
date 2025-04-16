import React, { useState, useEffect } from 'react';
import { getMyEvents, deleteEvent, getTaggedEvents } from '../services/api';
import { Box, Typography, Button, Card, CardContent, CardActions, Grid, Alert, CircularProgress, Divider } from '@mui/material';


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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>

      <Typography variant="h5" gutterBottom>My Created Events</Typography>
      <Grid container spacing={3}>
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Typography>
                  <Typography><strong>Category:</strong> {event.category}</Typography>
                  <Typography><strong>Location:</strong> {event.location}</Typography>
                </CardContent>
                <CardActions sx={{ marginTop: 'auto' }}>
                  <Button size="small" variant="contained" color="secondary" onClick={() => handleDelete(event.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No created events found.</Typography>
        )}
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" gutterBottom>Tagged Along Events</Typography>
      <Grid container spacing={3}>
        {Array.isArray(taggedEvents) && taggedEvents.length > 0 ? (
          taggedEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Typography>
                  <Typography><strong>Category:</strong> {event.category}</Typography>
                  <Typography><strong>Location:</strong> {event.location}</Typography>
                  <Typography sx={{ mb: 1 }}><strong>Attendees:</strong></Typography>
                    <Box
                    sx={{
                        maxHeight: 100,
                        overflowY: 'auto',
                        backgroundColor: '#f5f5f5',
                        p: 1,
                        borderRadius: 1,
                        border: '1px solid #ccc',
                    }}
                    >
                    {event.attendeeEmails && event.attendeeEmails.length > 0 ? (
                        event.attendeeEmails.map((email, index) => (
                        <Typography key={index} variant="body2">{email}</Typography>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">No attendees yet</Typography>
                    )}
                    </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No upcoming events yet.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Profile;