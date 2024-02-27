package com.example.itfinalproject.dto;

import lombok.Data;

@Data
public class StudentDTO {

    private Long id;

    private String name;

    private String surname;

    private Integer age;

    private Integer lessonsAmount;

    private String contacts;

    private Boolean active;

}
