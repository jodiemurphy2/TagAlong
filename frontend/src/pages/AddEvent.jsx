import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api'; 
import { Box, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText, Alert, Container } from '@mui/material';


const AddEvent = () => {
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [error, setError] = useState('');

    const categories = [
        'Music',
        'Sports',
        'Conference',
        'Meetup',
        'Workshop',
        'Festival',
        'Other',  
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            name: eventName,
            date: eventDate,
            category: eventCategory,
            location: eventLocation,
            description: eventDescription,
        };

        try {
            const response = await createEvent(eventData); 
            if (response.status === 201) {
                // Event created successfully, navigate to home page
                navigate('/');
            } else {
                throw new Error('Failed to create event');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="sm">  {}
            <Box p={3}>
                <Typography variant="h4" gutterBottom align="center">Add Event</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                
                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField
                            label="Event Name"
                            variant="outlined"
                            fullWidth
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </Box>

                    <Box mb={3}>
                        <TextField
                            label="Event Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Box>

                    <Box mb={3}>
                        <FormControl fullWidth required>
                            <InputLabel>Event Category</InputLabel>
                            <Select
                                value={eventCategory}
                                onChange={(e) => setEventCategory(e.target.value)}
                                label="Event Category"
                            >
                                <MenuItem value="">Select a category</MenuItem>
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Select the category of the event</FormHelperText>
                        </FormControl>
                    </Box>

                    <Box mb={3}>
                        <TextField
                            label="Event Location"
                            variant="outlined"
                            fullWidth
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            required
                        />
                    </Box>

                    <Box mb={3}>
                        <TextField
                            label="Event Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                        />
                    </Box>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Event
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddEvent;