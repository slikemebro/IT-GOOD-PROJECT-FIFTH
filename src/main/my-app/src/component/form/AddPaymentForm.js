import React from 'react'
import './AddStudentForm.css';
import PropTypes from "prop-types";
import {findAllStudents} from "../../request/student";

export class AddPaymentForm extends React.PureComponent {

    static propTypes = {
        addRow: PropTypes.func
    }

    static defaultProps = {
        addRow: () => {
        }
    }

    state = {
        paymentDateTime: null,
        studentId: null,
        amount: null,
        notice: null,
        lessonsAmount: null,
        students: [],
        studentName: "",
    }

    componentDidMount() {
        findAllStudents().then(data => this.setState({students: data.body}));
    }

    handleStudentIdInput(e) {
        this.setState({studentId: e.target.value})
    }

    handleAmountInput(e) {
        this.setState({amount: e.target.value});
    }

    handleLessonsAmount(e) {
        this.setState({lessonsAmount: e.target.value});
    }

    handleNoticeInput(e) {
        this.setState({notice: e.target.value});
    }

    handlePaymentDateTime(e) {
        const utcDate = this.getUtc(e);
        this.setState({paymentDateTime: utcDate})
    }

    getUtc(e) {
        const localDate = new Date(e.target.value);
        const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
        return utcDate.toISOString();
    }


    onSubmit(e) {
        e.preventDefault();
        const {paymentDateTime, notice, amount, studentId, lessonsAmount} = this.state;
        const DATA = {notice, amount, studentId, lessonsAmount, paymentDateTime};

        this.props.addRow(DATA);
    }

    handleStudentName(e) {
        console.log("choose: " + e.target.value);
        this.setState({studentName: e.target.value});
    }

    render() {
        return <div className="add-student-form">
            <div className="add-student-form-component">
                <label>Student name:</label>
                <input value={this.state.studentName} onChange={(e) => this.handleStudentName(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Student surname:</label>
                <select onChange={(e) => this.handleStudentIdInput(e)} className="add-student-form-input">
                    <option value={null}>Choose student</option>
                    {this.state.students.map(student => {
                        if (student.name.toLowerCase() === this.state.studentName.toLowerCase()) {
                            return <option value={student.id}>{student.surname}</option>
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
                <label>Lessons Amount:</label>
                <input value={this.state.lessonsAmount} onChange={(e) => this.handleLessonsAmount(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Date Time:</label>
                <input
                    type="datetime-local"
                    value={this.state.paymentDateTime ? new Date(this.state.paymentDateTime).toISOString().slice(0, 16) : ""}
                    onChange={(e) => this.handlePaymentDateTime(e)}
                    className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Notice:</label>
                <input value={this.state.notice} onChange={(e) => this.handleNoticeInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <button onClick={(e) => this.onSubmit(e)} className="add-student-form-button">Submit</button>
            </div>
        </div>
    }
}