import React from 'react'
import PropTypes from "prop-types";
import {findAllTeachers} from "../../request/teacher";

export class AddSalaryForm extends React.PureComponent {

    static propTypes = {
        addRow: PropTypes.func
    }

    static defaultProps = {
        addRow: () => {
        }
    }

    state = {
        dateTime: null,
        teacherId: null,
        amount: null,
        teacherName: "",
        teachers: [],
    }


    render() {
        return (
            <div className="add-student-form">
                <div className="add-student-form-component">
                    <label>Teacher Name:</label>
                    <input value={this.state.teacherName} onChange={(e) => this.handleTeacherName(e)}
                           className="add-student-form-input"/>
                </div>
                <div className="add-student-form-component">
                    <label>Teacher surname:</label>
                    <select onChange={(e) => this.handleTeacherId(e)}>
                        <option value={null}>Choose teacher</option>
                        {this.state.teachers.map(teacher => {
                            if (teacher.name.toLowerCase() === this.state.teacherName.toLowerCase()) {
                                return <option value={teacher.id}>{teacher.surname}</option>
                            }
                        })}
                    </select>
                </div>
                <div className="add-student-form-component">
                    <label>Amount:</label>
                    <input value={this.state.amount} onChange={(e) => this.handleAmountInput(e)}
                           className="add-student-form-input"/>
                </div>
                <div className="add-student-form-component">
                    <label>Date Time:</label>
                    <input
                        type="datetime-local"
                        value={this.state.dateTime ? new Date(this.state.dateTime).toISOString().slice(0, 16) : ""}
                        onChange={(e) => this.handleDateInput(e)}
                        className="add-student-form-input"/>
                </div>
                <div className="add-student-form-component">
                    <button onClick={(e) => this.onSubmit(e)} className="add-student-form-button">Submit</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        findAllTeachers().then(data => this.setState({teachers: data.body}));
    }

    onSubmit(e) {
        e.preventDefault();

        const {dateTime, teacherId, amount} = this.state;
        const localDate = new Date(dateTime);
        const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
        const DATA = {dateTime: utcDate, teacherId, amount};
        this.props.addRow(DATA);
    }

    getUtc(e) {
        const localDate = new Date(e.target.value);
        const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
        return utcDate.toISOString();
    }

    handleDateInput(e) {
        const date = this.getUtc(e);

        this.setState({dateTime: date});
    }

    handleAmountInput(e) {
        this.setState({amount: e.target.value});
    }

    handleTeacherId(e) {
        console.log("choose: " + e.target.value);
        this.setState({teacherId: e.target.value});
    }

    handleTeacherName(e) {
        this.setState({teacherName: e.target.value});
    }
}