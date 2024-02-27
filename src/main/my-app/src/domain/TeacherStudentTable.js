export class TeacherStudentTable {

    _tableId = null;
    _studentId = null;
    _teacherId = null;
    _studentName = null;
    _teacherName = null;
    _active = false;

    constructor(data) {
        if (!data) {
            return;
        }

        if (data.hasOwnProperty("tableId")) {
            this._tableId = data.tableId;
        }

        if (data.hasOwnProperty("studentId")) {
            this._studentId = data.studentId;
        }

        if (data.hasOwnProperty("teacherId")) {
            this._teacherId = data.teacherId;
        }

        if (data.hasOwnProperty("studentName")) {
            this._studentName = data.studentName;
        }

        if (data.hasOwnProperty("teacherName")) {
            this._teacherName = data.teacherName;
        }

        if (data.hasOwnProperty("active")) {
            this._active = data.active;
        }

    }

    get tableId() {
        return this._tableId;
    }

    set tableId(value) {
        this._tableId = value;
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

    get studentName() {
        return this._studentName;
    }

    set studentName(value) {
        this._studentName = value;
    }

    get teacherName() {
        return this._teacherName;
    }

    set teacherName(value) {
        this._teacherName = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    get requestObject() {
        return {
            tableId: this.tableId,
            studentId: this.studentId,
            teacherId: this.teacherId,
            studentName: this.studentName,
            teacherName: this.teacherName,
            active: this.active
        }
    }
}