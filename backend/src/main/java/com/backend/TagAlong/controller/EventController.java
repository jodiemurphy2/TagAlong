package com.backend.TagAlong.controller;

import java.security.Principal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.TagAlong.model.Event;
import com.backend.TagAlong.model.User;
import com.backend.TagAlong.service.EventService;
import com.backend.TagAlong.service.UserService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @GetMapping
    public Page<Event> getAllEvents(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "date") String sortBy
    ) {
        return eventService.getAllEvents(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Event> createEvent(@RequestBody Event event, Principal principal) {
        String email = principal.getName(); 
        User user = userService.findByEmail(email); 
        
        Event createdEvent = eventService.createEvent(event,user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, Principal principal) {
        boolean deleted = eventService.deleteIfOwnedByUser(id, principal.getName());
        if (deleted) {
            return ResponseEntity.ok("Event deleted");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete your own events");
        }
    }

    @PostMapping("/{eventId}/tag-along")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Event> tagAlongEvent(@PathVariable Long eventId, Principal principal) {
        String email = principal.getName();
        User user = userService.findByEmail(email);

        Event updatedEvent = eventService.addAttendee(eventId, user);
        return ResponseEntity.ok(updatedEvent);
    }

    @GetMapping("/tagged")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<Event>> getTaggedEvents(
        Principal principal,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "date") String sortBy
    ) {
        String email = principal.getName();
        
        Page<Event> taggedEvents = eventService.getEventsUserIsAttending(email, page, size, sortBy);

        if (taggedEvents.isEmpty()) {
            return ResponseEntity.noContent().build();  // No events found
        }

        return ResponseEntity.ok(taggedEvents);
}

    @GetMapping("/my-events")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<Event>> getMyEvents(
        Principal principal,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "date") String sortBy
    ){
        System.out.println("Authenticated User: " + principal.getName());
        
        Page<Event> events = eventService.getEventsByUser(principal.getName(), page, size, sortBy);

        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();  // No events found
        }

        return ResponseEntity.ok(events);
    }

    @GetMapping("/search")
    public Page<Event> searchEvents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10, sort = "date") Pageable pageable
    ) {
        if (name != null && name.trim().isEmpty()) name = null;
        if (category != null && category.trim().isEmpty()) category = null;

        if (name != null && date != null && category != null) {
            return eventService.searchByNameDateCategory(name, date, category, pageable);
        } else if (name != null && category != null) {
            return eventService.searchByNameAndCategory(name, category, pageable);
        } else if (date != null && category != null) {
            return eventService.searchByDateAndCategory(date, category, pageable);
        } else if (name != null && date != null) {
            return eventService.searchByNameAndDate(name, date, pageable);
        } else if (name != null) {
            return eventService.searchByName(name, pageable);
        } else if (date != null) {
            return eventService.searchByDate(date, pageable);
        } else if (category != null) {
            return eventService.searchByCategory(category, pageable);
        } else {
            return eventService.getAllEvents(pageable);
        }
    }
}
