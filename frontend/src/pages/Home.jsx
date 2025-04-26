import React, { useState, useEffect } from 'react';
import { getEvents, searchEvents, tagAlong } from '../services/api';
import { useAuthContext } from "../auth/AuthContext";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
  } from '@mui/material';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { authState } = useAuthContext();

  const categories = [
    'Music',
    'Sports',
    'Conference',
    'Meetup',
    'Workshop',
    'Festival',
    'Other',  
];

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
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Events</Typography>

      <Box component="form" onSubmit={handleSearch} display="flex" flexWrap="wrap" gap={2} mb={3}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ width: 'auto', maxWidth: 200, minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
        <Button type="button" variant="outlined" onClick={handleClearSearch}>Clear Search</Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : events.length === 0 ? (
        <Typography>No events found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography><strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-GB")}</Typography>
                  <Typography><strong>Category:</strong> {event.category}</Typography>
                  <Typography><strong>Location:</strong> {event.location}</Typography>
                  {authState.user && (
                    <><Typography sx={{ mb: 1 }}><strong>Attendees:</strong></Typography><Box
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
                    </Box></>
                  )}
                </CardContent>
                <CardActions sx={{ marginTop: 'auto' }}>
                {authState.user && (
                <Button
                    variant="contained"
                    onClick={() => handleTagAlong(event.id)}
                    sx={{
                        mt: 'auto',
                        backgroundColor: '#6a1b9a', 
                        '&:hover': {
                        backgroundColor: '#4a148c',
                        },
                        color: '#fff',
                        borderRadius: 2,
                        textTransform: 'none',
                        width: '100%',
                    }}
                    >
                    Tag-Along
                </Button>
                )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;