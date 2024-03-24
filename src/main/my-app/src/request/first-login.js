import {ajax} from "../util/ajax";
import {URL_FIRST_LOGIN} from "../constants/url";


export function findFirstLoginByUserId(id) {
    return ajax(`${URL_FIRST_LOGIN}`, {queryData: {userId: id}});
}