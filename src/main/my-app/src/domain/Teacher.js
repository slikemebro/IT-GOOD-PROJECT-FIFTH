export class Teacher {

    _id = null;
    _name = null;
    _surname = null;
    _age = null;
    _cardNumber = null;
    _cardName = null;
    _contacts = null;
    _active = false;
    _joined = false;

    constructor(data) {
        if (!data) {
            return;
        }

        if (data.hasOwnProperty("id")) {
            this._id = data.id;
        }

        if (data.hasOwnProperty("name")) {
            this._name = data.name;
        }

        if (data.hasOwnProperty("surname")) {
            this._surname = data.surname;
        }

        if (data.hasOwnProperty("age")) {
            this._age = data.age;
        }

        if (data.hasOwnProperty("cardNumber")) {
            this._cardNumber = data.cardNumber;
        }

        if (data.hasOwnProperty("cardName")) {
            this._cardName = data.cardName;
        }

        if (data.hasOwnProperty("contacts")) {
            this._contacts = data.contacts;
        }

        if (data.hasOwnProperty("active")) {
            this._active = data.active;
        }

        if (data.hasOwnProperty("active")) {
            this._active = data.active;
        }

        if (data.hasOwnProperty("joined")) {
            this._joined = data.joined;
        }

    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get surname() {
        return this._surname;
    }

    set surname(value) {
        this._surname = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }


    get cardName() {
        return this._cardName;
    }

    set cardName(value) {
        this._cardName = value;
    }

    get cardNumber() {
        return this._cardNumber;
    }

    set cardNumber(value) {
        this._cardNumber = value;
    }

    get contacts() {
        return this._contacts;
    }

    set contacts(value) {
        this._contacts = value;
    }

    get joined() {
        return this._joined;
    }

    set joined(value) {
        this._joined = value;
    }


    get requestObject() {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            age: this.age,
            cardName: this.cardName,
            cardNumber: this.cardNumber,
            contacts: this.contacts,
            active: this.active,
            joined: this.joined,
        }
    }
}