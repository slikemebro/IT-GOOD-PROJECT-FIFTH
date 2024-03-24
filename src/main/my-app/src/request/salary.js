import {ajax} from "../util/ajax";
import {URL_SALARY, URL_SALARY_TEACHER} from "../constants/url";

export function findAllSalary() {
    return ajax(URL_SALARY);
}

export function findSalaryByTeacherId(id) {
    return ajax(URL_SALARY_TEACHER, {
        queryData: {
            id: id
        }
    })
}

export function saveSalary(salary) {
    return ajax(URL_SALARY, {method: "post", data: salary});
}