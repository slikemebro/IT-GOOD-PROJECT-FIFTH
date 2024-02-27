import data from "superagent/lib/request-base";

export class Payment {

    _id = null;
    _amount = null;
    _studentId = null;
    _lessonsAmount = null;
    _paymentDateTime = null;
    _notice = null;
    _studentName = null;
    _studentSurname = null;

    constructor(data) {
        if (!data) {
            return;
        }

        if (data.hasOwnProperty("id")) {
            this._id = data.id;
        }

        if (data.hasOwnProperty("notice")) {
            this._notice = data.notice;
        }

        if (data.hasOwnProperty("amount")) {
            this._amount = data.amount;
        }

        if (data.hasOwnProperty("studentId")) {
            this._studentId = data.studentId;
        }

        if (data.hasOwnProperty("lessonsAmount")) {
            this._lessonsAmount = data.lessonsAmount;
        }

        if (data.hasOwnProperty("paymentDateTime")) {
            this._paymentDateTime = data.paymentDateTime;
        }

        if (data.hasOwnProperty("studentName")) {
            this._studentName = data.studentName;
        }

        if (data.hasOwnProperty("studentSurname")) {
            this._studentSurname = data.studentSurname;
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

    get studentId() {
        return this._studentId;
    }

    set studentId(value) {
        this._studentId = value;
    }

    get lessonsAmount() {
        return this._lessonsAmount;
    }

    set lessonsAmount(value) {
        this._lessonsAmount = value;
    }

    get paymentDateTime() {
        return this._paymentDateTime;
    }

    set paymentDateTime(value) {
        this._paymentDateTime = value;
    }

    get notice() {
        return this._notice;
    }

    set notice(value) {
        this._notice = value;
    }


    get studentName() {
        return this._studentName;
    }

    set studentName(value) {
        this._studentName = value;
    }

    get studentSurname() {
        return this._studentSurname;
    }

    set studentSurname(value) {
        this._studentSurname = value;
    }

    get requestObject() {
        return {
            id: this.id,
            amount: this.amount,
            studentId: this.studentId,
            lessonsAmount: this.lessonsAmount,
            paymentDateTime: this.paymentDateTime,
            notice: this.notice,
            studentName: this.studentName,
            studentSurname: this.studentSurname
        }
    }
}