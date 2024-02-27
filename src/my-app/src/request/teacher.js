import {ajax} from "../util/ajax";
import {URL_TEACHER, URL_TEACHER_SURNAME} from "../constants/url";

export function findAllTeachers() {
    return ajax(URL_TEACHER);
}

export function saveOrUpdateTeacher(teacher) {
    return ajax(URL_TEACHER, {data: teacher, method: "post"});
}

export function findTeacherBySurname(surname) {
    return ajax(URL_TEACHER_SURNAME, {queryData: {surname: surname}});
}

export function findTeacherById(id) {
    return ajax(URL_TEACHER + "/" + id);
}