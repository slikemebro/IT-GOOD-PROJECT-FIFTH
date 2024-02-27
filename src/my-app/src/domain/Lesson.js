export class Lesson {

    _id = null;
    _studentId = null;
    _teacherId = null;
    _theme = null;
    _status = null;
    _startDateTime = null;
    _endDateTime = null;
    _link = null;

    constructor(data) {
        if (!data) {
            return;
        }

        if (data.hasOwnProperty("id")) {
            this._id = data.id;
        }

        if (data.hasOwnProperty("studentId")) {
            this._studentId = data.studentId;
        }

        if (data.hasOwnProperty("teacherId")) {
            this._teacherId = data.teacherId;
        }

        if (data.hasOwnProperty("theme")) {
            this._theme = data.theme;
        }

        if (data.hasOwnProperty("status")) {
            this._status = data.status;
        }

        if (data.hasOwnProperty("startDateTime")) {
            this._startDateTime = data.startDateTime;
        }

        if (data.hasOwnProperty("endDateTime")) {
            this._endDateTime = data.endDateTime;
        }

        if (data.hasOwnProperty("link")) {
            this._link = data.link;
        }
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get studentId() {
        return this._studentId;
    }

    set studentId(value) {
        this._studentId = value;
    }

    get teacherId() {
        return this._teacherId;
    }

    set teacherId(value) {
        this._teacherId = value;
    }

    get theme() {
        return this._theme;
    }

    set theme(value) {
        this._theme = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get startDateTime() {
        return this._startDateTime;
    }

    set startDateTime(value) {
        this._startDateTime = value;
    }

    get endDateTime() {
        return this._endDateTime;
    }

    set endDateTime(value) {
        this._endDateTime = value;
    }

    get link() {
        return this._link;
    }

    set link(value) {
        this._link = value;
    }

    get requestObject() {
        return {
            id: this.id,
            studentId: this.studentId,
            teacherId: this.teacherId,
            theme: this.theme,
            status: this.status,
            startDateTime: this.startDateTime,
            endDateTime: this.endDateTime,
            link: this.link

        }
    }
}