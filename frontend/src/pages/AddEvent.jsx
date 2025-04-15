import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';  // Assuming you have this API function

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
            const response = await createEvent(eventData);  // Make sure createEvent is an API function
            if (response.status === 201) {
                // Event created successfully, navigate to home page
                navigate('/home');
            } else {
                throw new Error('Failed to create event');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Add Event</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Event Date:</label>
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Event Category:</label>
                    <select
                        value={eventCategory}
                        onChange={(e) => setEventCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Location:</label>  {/* New Location Field */}
                    <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
};

export default AddEvent;
