import {ajax} from "../util/ajax";
import {URL_PAYMENT} from "../constants/url";

export function findAllPayments() {
    return ajax(URL_PAYMENT);
}

export function savePayment(payment) {
    return ajax(URL_PAYMENT, {method: "post", data: payment});
}