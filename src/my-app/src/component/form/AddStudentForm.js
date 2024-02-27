import React from 'react'
import './AddStudentForm.css';
import PropTypes from "prop-types";
import {Student} from "../../domain/Student";

export class AddStudentForm extends React.PureComponent {

    static propTypes = {
        student: PropTypes.instanceOf(Student),
        addRow: PropTypes.func
    }

    static defaultProps = {
        student: null,
        addRow: () => {}
    }


    constructor(props) {
        super(props);
        this.state = this.initializeStateFromProps(props);
    }

    initializeStateFromProps(props) {
        return {
            name: props.student ? props.student.name : "",
            surname: props.student ? props.student.surname : "",
            age: props.student ? props.student.age : 0,
            contacts: props.student ? props.student.contacts : "",
            active: props.student ? props.student.active : 0,
            id: props.student ? props.student.id : null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.student !== prevProps.student) {
            console.log(this.props.student)
            this.setState(this.initializeStateFromProps(this.props));
        }
    }

    state = {
        id: null,
        name: "",
        surname: "",
        age: 0,
        contacts: "",
        active: 0
    }

    handleNameInput(e) {
        this.setState({name: e.target.value});
    }

    handleSurnameInput(e) {
        this.setState({surname: e.target.value});
    }

    handleAgeInput(e) {
        this.setState({age: e.target.value});
    }

    handleContactsInput(e) {
        this.setState({contacts: e.target.value});
    }


    isDataValid() {
        const {name, surname, age, contacts} = this.state;
        return !!name && !!surname && !!age && !!contacts;
    }

    onSubmit(e) {
        const { name, surname, age, contacts, active, id } = this.state;
        const DATA = { name, surname, age, contacts, active, id };

        this.props.addRow(new Student(DATA).requestObject);
    }

    handleCheckedBox(e) {
        this.setState({active: e.target.checked ? 1 : 0});
    }


    render() {
        return <div className="add-student-form">
            <div className="add-student-form-component">
                <label>Name:</label>
                <input value={this.state.name} onChange={(e) => this.handleNameInput(e)} className="add-student-form-input" />
            </div>
            <div className="add-student-form-component">
                <label>Surname:</label>
                <input value={this.state.surname} onChange={(e) => this.handleSurnameInput(e)} className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Age:</label>
                <input value={this.state.age} onChange={(e) => this.handleAgeInput(e)} className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Contacts:</label>
                <input value={this.state.contacts} onChange={(e) => this.handleContactsInput(e)} className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Active:</label>
                <input type="checkbox" onChange={(e) => this.handleCheckedBox(e)}/>
            </div>
            <div className="add-student-form-component">
            <button disabled={!this.isDataValid()} onClick={(e) => this.onSubmit(e)} className="add-student-form-button">Submit</button>
            </div>
        </div>

    }
}