export class Salary {

    _id = null;
    _amount = null;
    _dateTime = null;
    _teacherId = null;
    _teacherName = null;
    _teacherSurname = null;

    constructor(data) {
        if (!data) {
            return
        }

        if (data.hasOwnProperty("id")) {
            this._id = data.id;
        }

        if (data.hasOwnProperty("amount")) {
            this._amount = data.amount;
        }

        if (data.hasOwnProperty("dateTime")) {
            this._dateTime = data.dateTime;
        }

        if (data.hasOwnProperty("teacherId")) {
            this._teacherId = data.teacherId;
        }

        if (data.hasOwnProperty("teacherName")) {
            this._teacherName = data.teacherName;
        }

        if (data.hasOwnProperty("teacherSurname")) {
            this._teacherSurname = data.teacherSurname;
        }
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get dateTime() {
        return this._dateTime;
    }

    set dateTime(value) {
        this._dateTime = value;
    }

    get teacherId() {
        return this._teacherId;
    }

    set teacherId(value) {
        this._teacherId = value;
    }


    get teacherName() {
        return this._teacherName;
    }

    set teacherName(value) {
        this._teacherName = value;
    }

    get teacherSurname() {
        return this._teacherSurname;
    }

    set teacherSurname(value) {
        this._teacherSurname = value;
    }

    get requestObject() {
        return {
            id: this.id,
            teacherId: this.teacherId,
            dateTime: this.dateTime,
            amount: this.amount,
            teacherName: this.teacherName,
            teacherSurname: this.teacherSurname
        }
    }
}