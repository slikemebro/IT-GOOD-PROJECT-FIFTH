import React from 'react'
import PropTypes from "prop-types";
import './css/ModalLessonRow.css';
import {saveSalary, findSalaryByTeacherId} from "../../request/salary"
import {Student} from "../../domain/Student";
import {Salary} from "../../domain/Salary";

export class ModalLessonRow extends React.PureComponent {
    static propTypes = {
        fromDate: PropTypes.any,
        toDate: PropTypes.any,
        theme: PropTypes.string,
        status: PropTypes.number,
        student: PropTypes.instanceOf(Student),
        link: PropTypes.string,
        operateLesson: PropTypes.func,
        userRole: PropTypes.string,
        teacherId: PropTypes.number
    }

    formatTime(date) {
        return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    renderStatus(status) {
        switch (status) {
            case 1:
                return <span className="status-pending"/>;
            case 2:
                return <span className="status-completed">&#10004;</span>;
            default:
                return <span className="status-canceled">&#10008;</span>;
        }
    }

    isAdmin() {
        return this.props.userRole === "ADMIN";
    }

    render() {
        const formattedFromTime = this.formatTime(this.props.fromDate);
        const formattedToTime = this.formatTime(this.props.toDate);

        return (
            <div className="modal-lesson-row">
                <a href={"https://"+this.props.link} target="_blank" rel="noopener noreferrer">
                    <div>{formattedFromTime} - {formattedToTime}</div>
                </a>
                <div>{this.props.theme}</div>
                <div>{this.props.student.name}</div>
                {this.isAdmin() ? this.ifUserIsAdmin() : this.ifUserIsNotAdmin()}
            </div>
        )
    }

    operateLesson(action) {
        const DATA = {
            link: this.props.link,
            theme: this.props.theme,
            startDateTime: this.props.fromDate,
            endDateTime: this.props.toDate,
            status: action
        }
        this.props.operateLesson(DATA);

        const DATA_FOR_SALARY = {
            dateTime: new Date(),
            teacherId: this.props.teacherId,
            amount: 130
        };
        // let salary = new Salary(DATA_FOR_SALARY);
        // saveSalary(salary.requestObject).then(() => {
        //     console.log("salary saved for teacher with id: " + this.props.teacherId);
        // });
    }

    ifUserIsAdmin() {
        return (
            <>
                <div>
                    <button onClick={() => this.operateLesson(2)}>Complete</button>
                </div>
                <div>
                    <button onClick={() => this.operateLesson(0)}>Cancel</button>
                </div>
                <div>{this.renderStatus(this.props.status)}</div>
            </>
        );
    }

    ifUserIsNotAdmin() {
        return (
            <div>{this.renderStatus(this.props.status)}</div>
        )
    }
}
