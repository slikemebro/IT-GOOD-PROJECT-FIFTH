import{ajax} from "../util/ajax";
import{URL_FIRST_LOGIN} from "../constants/url";


export function findFirstLoginByUserId(id) {
    return ajax(`${URL_FIRST_LOGIN}`, {queryData: {userId: id}});
}

export function deleteFirstLoginByUserId(id) {
    return ajax(`${URL_FIRST_LOGIN}`, {method: "delete", queryData: {userId: id}});
}