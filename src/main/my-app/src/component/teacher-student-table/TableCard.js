import React from 'react'
import PropTypes from "prop-types";
import './teacher_student_card.css';

export class TableCard extends React.PureComponent {

    static propTypes = {
        teacherName: PropTypes.string,
        studentName: PropTypes.string,
        active: PropTypes.bool,
        tableId: PropTypes.number,
        onClick: PropTypes.func
    }

    static defaultProps = {
        teacherName: "",
        studentName: "",
        active: false,
        tableId: null
    }

    render() {
        return <div onClick={() => this.props.onClick(this.props.tableId)} className="teacher-student-card">
            <p><h4>Teacher: {this.props.teacherName}</h4></p>
            <p><h4>Student: {this.props.studentName}</h4></p>
        </div>
    }

}