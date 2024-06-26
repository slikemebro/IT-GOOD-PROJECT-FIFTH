import {ajax} from "../util/ajax";
import {
    URL_CURRENT_USER,
    URL_GET_FIRST_LOGIN,
    URL_GET_USER,
    URL_LOGIN,
    URL_SWITCH_USER,
    URL_UPDATE_PASSWORD,
    URL_VERIFY_TOKEN
} from "../constants/url";


export function authentication(authenticationRequest) {
    return ajax(URL_LOGIN, {data: authenticationRequest, method: "post"});
}

export function verifyToken() {
    return ajax(URL_VERIFY_TOKEN, {method: "post", queryData: {token: localStorage.getItem('token')}});
}

export function currentUser() {
    return ajax(URL_CURRENT_USER);
}

export function findUserByTeacherId(id) {
    return ajax(URL_GET_USER, {queryData: {teacherId: id}});
}

export function findUserByEmail(email) {
    return ajax(URL_GET_FIRST_LOGIN, {queryData: {email: email}});
}

export function updateUserPassword(password, email) {
    return ajax(URL_UPDATE_PASSWORD, {queryData: {password: password, email: email}, method: "put"});
}

export function switchUser(teacherId) {
    return ajax(URL_SWITCH_USER, {queryData: {teacherId: teacherId}, method: "post"})
}
