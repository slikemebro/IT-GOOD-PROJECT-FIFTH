package com.example.itfinalproject.repository.specification;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TeacherSearchCriteria {
    private long id;
    private String name;
    private String surname;

}
