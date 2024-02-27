import {ajax} from "../util/ajax";
import {URL_TABLE, URL_TABLE_ID, URL_TABLE_NAMES, URL_TABLE_TEACHER} from "../constants/url";

export function getTableNames() {
    return ajax(URL_TABLE_NAMES);
}

export function getTableById(id) {
    return ajax(URL_TABLE_ID, {method: "get", queryData: {id: id}});
}

export function saveOrUpdateTable(table) {
    return ajax(URL_TABLE, {method: "post", data: table})
}

export function getTableByTeacherId(id) {
    return ajax(URL_TABLE_TEACHER, {method: "get", queryData: {teacherId: id}});
}