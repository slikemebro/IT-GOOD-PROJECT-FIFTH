package com.example.itfinalproject.repository.specification;

import com.example.itfinalproject.domain.Teacher;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

@Log4j2
public class TeacherSpecification implements Specification<Teacher> {

    private final TeacherSearchCriteria criteria;

    public TeacherSpecification(TeacherSearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Teacher> teacherRoot, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        ArrayList<Predicate> predicates = new ArrayList<>();

        if (criteria.getName() != null) {
            log.info("Has name criteria");
            predicates.add(criteriaBuilder.equal(teacherRoot.get("name"), criteria.getName()));
        }

        if (criteria.getSurname() != null) {
            log.info("Has surname criteria");
            predicates.add(criteriaBuilder.equal(teacherRoot.get("surname"), criteria.getSurname()));
        }

        if (criteria.getId() != 0) {
            log.info("Has id criteria");
            predicates.add(criteriaBuilder.equal(teacherRoot.get("id"), criteria.getId()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
