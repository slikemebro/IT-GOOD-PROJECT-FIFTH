export class FirstLogin {
    _userId = null;
    _password = null;

    constructor(data) {
        if (!data) {
            return;
        }
        if (data.hasOwnProperty("userId")) {
            this._userId = data.userId;
        }
        if (data.hasOwnProperty("password")) {
            this._password = data.password;
        }
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get requestObject() {
        return {
            userId: this.userId,
            password: this.password
        }
    }
}