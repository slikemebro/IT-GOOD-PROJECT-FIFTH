package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByIdIn(List<Long> id);

    List<Lesson> findByTeacherId(Long teacherId);
}