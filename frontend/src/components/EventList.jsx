import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';

const EventCard = ({ event, onTagAlong, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Category:</strong> {event.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Location:</strong> {event.location}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small" onClick={onTagAlong} sx={{ backgroundColor: '#6a1b9a', color: '#fff' }}>
          Tag-Along
        </Button>
        <Button size="small" onClick={onDelete} sx={{ backgroundColor: '#d32f2f', color: '#fff' }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const EventList = ({ events, onTagAlong, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} onTagAlong={() => onTagAlong(event.id)} onDelete={() => onDelete(event.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;