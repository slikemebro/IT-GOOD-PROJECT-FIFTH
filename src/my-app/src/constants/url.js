const URL_API_PREFIX = "http://localhost:8080/api/v1";

export const URL_STUDENT = `${URL_API_PREFIX}/student`;
export const URL_TEACHER = `${URL_API_PREFIX}/teacher`;
export const URL_TABLE = `${URL_API_PREFIX}/table`;
export const URL_LESSON = `${URL_API_PREFIX}/lesson`;
export const URL_PAYMENT =`${URL_API_PREFIX}/payment`
export const URL_SALARY = `${URL_API_PREFIX}/salary`;

export const URL_FIRST_LOGIN = `${URL_API_PREFIX}/first-login`;

export const URL_AUTH = `${URL_API_PREFIX}/auth`;

export const URL_LESSON_IDS = `${URL_LESSON}/ids`;
export const URL_LESSON_BY_TEACHER = `${URL_LESSON}/teacher`;

export const URL_TABLE_NAMES = `${URL_TABLE}/names`;

export const URL_TABLE_ID = `${URL_TABLE}/id`;

export const URL_TABLE_TEACHER = `${URL_TABLE}/teacher`;

export const URL_TEACHER_SURNAME = `${URL_TEACHER}/surname`;

export const URL_STUDENT_SURNAME = `${URL_STUDENT}/surname`;

export const URL_STUDENT_ID = `${URL_STUDENT}/id`;

export const URL_SALARY_TEACHER = `${URL_SALARY}/teacher`

export const URL_REGISTRATION = `${URL_AUTH}/register`;

export const URL_LOGIN = `${URL_AUTH}/authenticate`;

export const URL_GET_USER = `${URL_AUTH}/user`;

export const URL_GET_FIRST_LOGIN = `${URL_GET_USER}/first-login`;

export const URL_VERIFY_TOKEN = `${URL_AUTH}/verify-token`;

export const URL_CURRENT_USER = `${URL_AUTH}/current-user`;

export const URL_UPDATE_PASSWORD = `${URL_AUTH}/user/password`;

export const URL_SWITCH_USER = `${URL_AUTH}/user/switch`;