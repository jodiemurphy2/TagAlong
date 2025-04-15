package com.backend.TagAlong.repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.TagAlong.model.Event;

public interface EventRepository extends JpaRepository<Event, Long>{
    Page<Event> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Event> findByDate(LocalDate date, Pageable pageable);

    Page<Event> findByCategoryIgnoreCase(String category, Pageable pageable);

    Page<Event> findByNameContainingIgnoreCaseAndDate(String name, LocalDate date, Pageable pageable);

    Page<Event> findByNameContainingIgnoreCaseAndCategoryIgnoreCase(String name, String category, Pageable pageable);

    Page<Event> findByDateAndCategoryIgnoreCase(LocalDate date, String category, Pageable pageable);

    Page<Event> findByNameContainingIgnoreCaseAndDateAndCategoryIgnoreCase(String name, LocalDate date, String category, Pageable pageable);

    Page<Event> findAll(Pageable pageable);

    Page<Event> findByCreatedById(Long userId, Pageable pageable);
}
