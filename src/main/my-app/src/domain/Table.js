
export class Table {

    _id = null;
    _teacherId = null;
    _studentId = null;
    _active = false;
    _lessonIds = [];


    constructor(data) {
        if (!data) {
            return
        }

        if (data.hasOwnProperty('id')) {
            this._id = data.id;
        }

        if (data.hasOwnProperty('teacherId')) {
            this._teacherId = data.teacherId;
        }

        if (data.hasOwnProperty('studentId')) {
            this._studentId = data.studentId;
        }

        if (data.hasOwnProperty('active')) {
            this._active = data.active;
        }

        if (data.hasOwnProperty('lessonIds')) {
            this._lessonIds = data.lessonIds;
        }
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get teacherId() {
        return this._teacherId;
    }

    set teacherId(value) {
        this._teacherId = value;
    }

    get studentId() {
        return this._studentId;
    }

    set studentId(value) {
        this._studentId = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    get lessonIds() {
        return this._lessonIds;
    }

    set lessonIds(value) {
        this._lessonIds = value;
    }

    get requestObject() {
        return {
            id: this.id,
            teacherId: this.teacherId,
            studentId: this.studentId,
            active: this.active,
            lessonIds: this.lessonIds
        }
    }
}