import {ajax} from "../util/ajax";
import {URL_STUDENT, URL_STUDENT_ID, URL_STUDENT_SURNAME} from "../constants/url";

export function findAllStudents() {
    return ajax(URL_STUDENT);
}

export function saveOrUpdateStudent(student) {
    return ajax(URL_STUDENT, {data: student, method: "post"});
}

export function findStudentBySurname(surname) {
    return ajax(URL_STUDENT_SURNAME, {queryData: {surname: surname}});
}

export function findStudentById(id) {
    return ajax(URL_STUDENT_ID, {queryData: {id: id}});
}