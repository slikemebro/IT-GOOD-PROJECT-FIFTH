package com.example.itfinalproject.repository.specification;

import com.example.itfinalproject.domain.Teacher;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class TeacherSpecification implements Specification<Teacher> {

    private final TeacherSearchCriteria criteria;

    public TeacherSpecification(TeacherSearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Teacher> teacherRoot, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        ArrayList<Predicate> predicates = new ArrayList<>();

        if (criteria.getName() != null) {
            predicates.add(criteriaBuilder.equal(teacherRoot.get("name"), criteria.getName()));
        }

        if (criteria.getSurname() != null) {
            predicates.add(criteriaBuilder.equal(teacherRoot.get("surname"), criteria.getSurname()));
        }

        if (criteria.getId() != 0) {
            predicates.add(criteriaBuilder.equal(teacherRoot.get("id"), criteria.getId()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
