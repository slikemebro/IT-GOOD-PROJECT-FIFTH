import React from 'react';
import PropTypes from "prop-types";
import './css/ModalLessonDate.css';

export class ModalLessonDate extends React.PureComponent {
    static propTypes = {
       date: PropTypes.any,
        completedLessonsCount: PropTypes.number
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).replace('.', '');
    }

    render() {
        const date = this.formatDate(this.props.date);
        const bonus = this.props.completedLessonsCount * 130; // Расчет дополнительной суммы

        return <div className="modal-lesson-date">
            {date} <span className="bonus-amount">= {bonus} грн.</span>
        </div>
    }
}
