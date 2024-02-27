package com.example.itfinalproject.dto;

import lombok.Data;

@Data
public class TeacherStudentTableDTO {

    private String teacherName;

    private String studentName;

    private Long teacherId;

    private Long studentId;

    private Long tableId;

    private Boolean active;

}
