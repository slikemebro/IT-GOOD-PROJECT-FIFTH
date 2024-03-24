export class UserInfoFile {
    _email = null;
    _password = null;


    constructor(data) {
        if (!data) {
            return;
        }
        if (data.hasOwnProperty("email")) {
            this._email = data.email;
        }
        if (data.hasOwnProperty("password")) {
            this._password = data.password;
        }
    }


    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }


    get requestObject() {
        return {
            email: this._email,
            password: this._password
        }
    }
}