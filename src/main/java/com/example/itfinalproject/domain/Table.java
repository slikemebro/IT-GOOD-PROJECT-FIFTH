package com.example.itfinalproject.domain;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@jakarta.persistence.Table(name = "table_teacher_student")
@Getter
@Setter
@Entity
public class Table {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private Long teacherId;

    private Long studentId;

    @ElementCollection
    @CollectionTable(name = "lesson_ids", joinColumns = @JoinColumn(name = "relation_id"))
    @Column(name = "lesson_id")
    private List<Long> lessonIds;

    private Boolean active;

}
