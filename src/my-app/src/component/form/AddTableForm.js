import React from 'react';
import './AddStudentForm.css';
import { findStudentBySurname } from "../../request/student";
import { findTeacherBySurname } from "../../request/teacher";
import { Teacher } from "../../domain/Teacher";
import { Student } from "../../domain/Student";
import PropTypes from "prop-types";
import { Table } from "../../domain/Table";

export class AddTableForm extends React.PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        onSubmit: () => {}
    }

    state = {
        students: [],
        teachers: [],
        selectedTeacher: null,
        selectedStudent: null,
        active: false
    }

    findTeacher(value) {
        if (value.length > 2) {
            findTeacherBySurname(value).then((response) => {
                if (response.body) {
                    const TEACHERS = response.body.map((teacher) => new Teacher(teacher));
                    this.setState({ teachers: TEACHERS });
                }
            });
        }
    }

    findStudent(value) {
        if (value.length > 2) {
            findStudentBySurname(value).then((response) => {
                if (response.body) {
                    const STUDENTS = response.body.map((student) => new Student(student));
                    this.setState({ students: STUDENTS });
                }
            });
        }
    }

    onSubmit = () => {
        const { selectedTeacher, selectedStudent, active } = this.state;
        if (selectedTeacher && selectedStudent) {
            const DATA = {
                teacherId: selectedTeacher.id,
                studentId: selectedStudent.id,
                active
            };

            this.props.onSubmit(new Table(DATA).requestObject);
        }
    }

    handleTeacherInputChange = (event) => {
        this.findTeacher(event.target.value);
    }

    handleTeacherSelect = (teacher) => {
        this.setState({ selectedTeacher: teacher });
    }

    handleStudentInputChange = (event) => {
        this.findStudent(event.target.value);
    }

    handleStudentSelect = (student) => {
        this.setState({ selectedStudent: student });
    }

    render() {
        return (
            <div className="add-form">
                {/* Teacher selection */}
                <div className="form-component">
                    <label>Teacher Surname:</label>
                    <input
                        type="text"
                        onChange={this.handleTeacherInputChange}
                        className="form-input"
                    />
                    {this.state.teachers.length > 0 && (
                        <div className="autocomplete-options">
                            {this.state.teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className="autocomplete-option"
                                    onClick={() => this.handleTeacherSelect(teacher)}
                                >
                                    {teacher.surname}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Student selection */}
                <div className="form-component">
                    <label>Student Surname:</label>
                    <input
                        type="text"
                        onChange={this.handleStudentInputChange}
                        className="form-input"
                    />
                    {this.state.students.length > 0 && (
                        <div className="autocomplete-options">
                            {this.state.students.map((student, index) => (
                                <div
                                    key={index}
                                    className="autocomplete-option"
                                    onClick={() => this.handleStudentSelect(student)}
                                >
                                    {student.surname}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Active checkbox */}
                <div className="form-component">
                    <label>Active:</label>
                    <input
                        type="checkbox"
                        checked={this.state.active}
                        onChange={(e) => this.setState({ active: e.target.checked })}
                        className="form-checkbox"
                    />
                </div>

                {/* Submit button */}
                <div className="form-component">
                    <button
                        onClick={this.onSubmit}
                        className="form-button"
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    selectTeacher(e) {
        this.setState({selectedTeacher: this.state.teachers.find(teacher => teacher.surname == e.target.value)});
    }
}
