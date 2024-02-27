import {ajax} from "../util/ajax";
import {URL_LESSON, URL_LESSON_BY_TEACHER, URL_LESSON_IDS} from "../constants/url";

export function findLessonsByIds(ids) {
    return ajax(URL_LESSON_IDS, {method: "post", data: ids});
}

export function saveLesson(lesson, tableId) {
    return ajax(URL_LESSON, {method: "post", data: lesson, queryData: {tableId: tableId}});
}

export function findLessonByTeacherId(id) {
    return ajax(URL_LESSON_BY_TEACHER, {method: "get", queryData: {teacherId: id}});
}