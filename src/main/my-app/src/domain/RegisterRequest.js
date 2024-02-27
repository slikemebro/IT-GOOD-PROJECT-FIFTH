export class RegisterRequest{
    _id = null;
    _email = null;
    _username = null;
    _password = null;


    constructor(data) {
        if (!data) {
            return;
        }

        if (data.hasOwnProperty("id")) {
            this._id = data.id;
        }

        if (data.hasOwnProperty("email")) {
            this._email = data.email;
        }

        if (data.hasOwnProperty("username")) {
            this._username = data.username;
        }

        if (data.hasOwnProperty("password")) {
            this._password = data.password;
        }
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get requestObject(){
        return{
            id: this.id,
            email: this.email,
            username: this.username,
            password: this.password
        }
    }
}