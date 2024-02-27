package com.example.itfinalproject.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "lessons_balance")
@Getter
@Setter
@Entity
public class LessonsBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long studentId;

    private Integer lessonsBalance;

}
