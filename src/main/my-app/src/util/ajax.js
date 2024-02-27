import superagent from 'superagent';

import { RequestModel } from './RequestModel';

const DEFAULT_OPTIONS = {
    method: 'get',
    data: {},
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
};
const DEFAULT_HEADERS = {
    Accept: 'application/json'
};
const AVAILABLE_METHODS = ['get', 'post', 'put', 'delete'];
const METHODS_NAMES = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'del'
};

export function convertToFormData(data) {
    const FORM_DATA = new FormData();

    if (!data) {
        return FORM_DATA;
    }

    const KEYS = Object.keys(data);

    for (let i = 0; i < KEYS.length; i++) {
        if (data[KEYS[i]] === null || typeof data[KEYS[i]] === 'undefined') {
            continue;
        }
        if (typeof data[KEYS[i]] === 'object') {
            if (data[KEYS[i]] instanceof Array) {
                for (let j = 0; j < data[KEYS[i]].length; j++) {
                    if (data[KEYS[i]][j] instanceof File) {
                        FORM_DATA.append(`${KEYS[i]}[]`, data[KEYS[i]][j]);
                    } else if (typeof data[KEYS[i]][j] === 'object') {
                        FORM_DATA.append(`${KEYS[i]}[]`, JSON.stringify(data[KEYS[i]][j]));
                    } else {
                        FORM_DATA.append(`${KEYS[i]}[]`, data[KEYS[i]][j]);
                    }
                }
            } else if (data[KEYS[i]] instanceof File) {
                FORM_DATA.append(KEYS[i], data[KEYS[i]]);
            } else {
                FORM_DATA.append(KEYS[i], JSON.stringify(data[KEYS[i]]));
            }
        } else {
            FORM_DATA.append(KEYS[i], data[KEYS[i]]);
        }
    }
    return FORM_DATA;
}

export function uriEncode(data) {
    if (data === null || data === undefined || (data instanceof Array && !data.length)) {
        return '';
    }
    if (data instanceof Array) {
        return data.map((item) => encodeURIComponent(item)).join(',');
    }
    if (typeof data === 'object') {
        const KEYS = Object.keys(data);

        return KEYS.map((key) => {
            const STR = uriEncode(data[key]);

            if (STR) {
                return `${key}=${STR}`;
            }
        })
            .filter((val) => typeof val !== 'undefined')
            .join('&');
    }
    return encodeURIComponent(data);
}

/**
 * NOTE: if you need to use Promise methods like Promise.all, then you must use 'promise' field of returned object
 * EXAMPLE: Promise.all([ajax(url, options).promise]).then(somethingElse)
 * It is done like this, because we need some pass through handlers, like handle server errors
 *
 * @param {String} url - url string
 * @param {{headers: {"Content-Type": string}, method: string, data: *}} [options] - options for Superagent
 * @param {('get'|'post'|'put'|'delete')} [options.method = 'get'] - request method
 * @param {Boolean} [options.queryCsrf] - if true will send csrf token in query params - Currently testing this replaced with CSRF in HEADER
 * @param {Boolean} [options.csrf] - if true will send csrf token in body
 * @param {{}} [options.queryData] - request query params
 * @param {*} [options.data] - request body
 * @param {String[]} [options.headers] - request headers
 * @param {Boolean} [formData] - if true will send form data
 * @param timeout - if needs to change default timeout
 * @returns {RequestModel} - returns promise like instance
 */
export function ajax(url, options, formData = false, timeout = null) {
    // const DEFAULT_OPTIONS = {
    //     method: 'get',
    //     data: {},
    //     headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    // };
    if (localStorage.getItem('token') === null) {
        DEFAULT_OPTIONS.headers = {};
    }else {
        DEFAULT_OPTIONS.headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    }

    const { queryData, data, ...optionsData } = options || {};
    const OPTIONS = { ...DEFAULT_OPTIONS, ...optionsData, data };

    const METHOD = OPTIONS.method.toLowerCase();
    const HEADERS = { ...DEFAULT_HEADERS, ...OPTIONS.headers };
    let reqUrl = url;
    let urlEncodedData = '';

    if (AVAILABLE_METHODS.indexOf(METHOD) === -1) {
        throw new Error('Invalid request method');
    }

    const QUERY_DATA =
        queryData && !Array.isArray(queryData) && typeof queryData === 'object'
            ? queryData
            : null;

    if (QUERY_DATA) {
        urlEncodedData += uriEncode(QUERY_DATA);
    }

    if (urlEncodedData.length) {
        reqUrl = `${reqUrl}${reqUrl.indexOf('?') === -1 ? '?' : '&'}${urlEncodedData}`;
    }

    const REQUEST = new RequestModel(superagent.agent()[METHODS_NAMES[METHOD]](reqUrl));

    if (timeout !== null) {
        REQUEST.timeout(timeout);
    }

    for (const HEADER in HEADERS) {
        REQUEST.set(HEADER, HEADERS[HEADER]);
    }

    if (formData) {
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof File || data[key] === null) {
                REQUEST.attach(key, data[key]);
            } else {
                REQUEST.field(key, data[key]);
            }
        });
    } else {
        REQUEST.type('application/json');
        REQUEST.send(data);
    }
    REQUEST.catch((err) => {
        const STATUS = (err.response && err.response.statusCode) || err.statusCode;

        return Promise.reject(err);
    });

    return REQUEST;
}
