package com.backend.TagAlong.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.TagAlong.model.Event;
import com.backend.TagAlong.model.User;
import com.backend.TagAlong.repository.EventRepository;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserService userService;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event createEvent(Event event, User user) {
        event.setCreatedBy(user);
        return eventRepository.save(event);
    }

    public boolean deleteIfOwnedByUser(Long eventId, String email) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            if (event.getCreatedBy().getEmail().equals(email)) {
                eventRepository.deleteById(eventId);
                return true;
            }
        }
        return false;
    }

    public Page<Event> getEventsByUser(String email, int page, int size, String sortBy) {
        User user = userService.findByEmail(email);
        Long userID = user.getId();
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        
        return eventRepository.findByCreatedById(userID, pageable);
    }

    public Page<Event> getEventsUserIsAttending(String email, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return eventRepository.findByAttendeeEmailsContaining(email , pageable);
    }

    public Event addAttendee(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        String userEmail = user.getEmail();
        System.out.println("Existing attendees: " + event.getAttendeeEmails());

        if (!event.getAttendeeEmails().contains(userEmail)) {
            event.getAttendeeEmails().add(userEmail);
            Event saved = eventRepository.save(event);
            System.out.println("User " + userEmail + " added to event ID " + eventId);
            return saved;
        }
        System.out.println("User " + userEmail + " already tagged along for event ID " + eventId);
        return event;
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Page<Event> getAllEvents(Pageable pageable) {
        return eventRepository.findAll(pageable);
    }

    public Page<Event> searchByName(String name, Pageable pageable) {
        return eventRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Event> searchByDate(LocalDate date, Pageable pageable) {
        return eventRepository.findByDate(date, pageable);
    }

    public Page<Event> searchByCategory(String category, Pageable pageable) {
        return eventRepository.findByCategoryIgnoreCase(category, pageable);
    }

    public Page<Event> searchByNameAndDate(String name, LocalDate date, Pageable pageable) {
        return eventRepository.findByNameContainingIgnoreCaseAndDate(name, date, pageable);
    }

    public Page<Event> searchByNameAndCategory(String name, String category, Pageable pageable) {
        return eventRepository.findByNameContainingIgnoreCaseAndCategoryIgnoreCase(name, category, pageable);
    }

    public Page<Event> searchByDateAndCategory(LocalDate date, String category, Pageable pageable) {
        return eventRepository.findByDateAndCategoryIgnoreCase(date, category, pageable);
    }

    public Page<Event> searchByNameDateCategory(String name, LocalDate date, String category, Pageable pageable) {
        return eventRepository.findByNameContainingIgnoreCaseAndDateAndCategoryIgnoreCase(name, date, category, pageable);
    }


    
}
