import React from 'react'
import PropTypes from "prop-types";
import './css/ModalLessonRow.css';
import {Student} from "../../domain/Student";

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
        return new Date(date).toJSON().slice(11, 16);
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
                <a href={"https://" + this.props.link} target="_blank" rel="noopener noreferrer">
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
