package com.example.itfinalproject.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Table(name = "teacher")
@Getter
@Setter
@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String surname;

    private Integer age;

    private String cardNumber;

    private String cardName;

    private String contacts;

    private Instant joined;

    private Boolean active;

}
