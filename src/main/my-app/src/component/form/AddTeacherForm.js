import React from 'react'
import './AddStudentForm.css';
import PropTypes from "prop-types";
import {Teacher} from "../../domain/Teacher";
import CardNumberInput from "../custom-components/CardNumberInput";

export class AddTeacherForm extends React.PureComponent {

    static propTypes = {
        teacher: PropTypes.instanceOf(Teacher),
        addRow: PropTypes.func,
        updateTeacher: PropTypes.func,
        isUpdate: PropTypes.bool
    }

    static defaultProps = {
        teacher: null,
        addRow: () => {
        }
    }

    constructor(props) {
        super(props);
        this.state = this.initializeStateFromProps(props);
    }

    initializeStateFromProps(props) {
        return {
            name: props.teacher ? props.teacher.name : "",
            surname: props.teacher ? props.teacher.surname : "",
            age: props.teacher ? props.teacher.age : 0,
            contacts: props.teacher ? props.teacher.contacts : "",
            active: props.teacher ? props.teacher.active : 0,
            id: props.teacher ? props.teacher.id : null,
            cardName: props.teacher ? props.teacher.cardName : "",
            cardNumber: props.teacher ? props.teacher.cardNumber : "",
            joined: props.teacher ? props.teacher.joined : 0
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.teacher !== prevProps.teacher) {
            this.setState(this.initializeStateFromProps(this.props));
        }
    }

    state = {
        id: null,
        name: "",
        surname: "",
        age: 0,
        contacts: "",
        cardName: "",
        cardNumber: "",
        joined: "",
        active: 0,
        checked: false
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

    handleCardNumberInput = (cardNumber) => {
        this.setState({cardNumber: cardNumber.replace(/\s/g, '')},
            () => console.log(this.state.cardNumber));
    }

    handleCardNameInput(e) {
        this.setState({cardName: e.target.value});
    }

    handleJoinedInput(e) {
        const localDate = new Date(e.target.value);
        const utcDate = Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
        this.setState({joined: utcDate});
    }

    isDataValid() {
        const {name, surname, age, contacts, cardName, cardNumber, joined} = this.state;
        return !!name && !!surname && !!age && !!contacts && !!cardName && !!cardNumber && !!joined;
    }

    onSubmit(e) {
        e.preventDefault();
        const {name, surname, age, contacts, active, cardName, cardNumber, joined, id} = this.state;
        const DATA = {
            id,
            name,
            surname,
            age,
            contacts,
            active,
            cardName,
            cardNumber,
            joined: new Date(joined).toISOString()
        };
        if (this.props.isUpdate) {
            this.props.updateTeacher(new Teacher(DATA).requestObject);
        } else {
            this.props.addRow(new Teacher(DATA).requestObject);
        }
    }

    render() {
        return <div className="add-student-form">
            <div className="add-student-form-component">
                <label>Name:</label>
                <input value={this.state.name} onChange={(e) => this.handleNameInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Surname:</label>
                <input value={this.state.surname} onChange={(e) => this.handleSurnameInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Age:</label>
                <input value={this.state.age} onChange={(e) => this.handleAgeInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Contacts:</label>
                <input value={this.state.contacts} onChange={(e) => this.handleContactsInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Card Name:</label>
                <input value={this.state.cardName} onChange={(e) => this.handleCardNameInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <CardNumberInput onCardNumberChange={this.handleCardNumberInput}/>
            </div>
            <div className="add-student-form-component">
                <label>Joined:</label>
                <input
                    type="date"
                    value={this.state.joined ? new Date(this.state.joined).toISOString().slice(0, 10) : ""}
                    onChange={(e) => this.handleJoinedInput(e)}
                    className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Active:</label>
                <input type="checkbox" onChange={(e) => this.handleCheckedBox(e)}/>
            </div>
            <div className="add-student-form-component">
                <button disabled={!this.isDataValid()} onClick={(e) => this.onSubmit(e)}
                        className="add-student-form-button">Submit
                </button>
            </div>
        </div>
    }

    handleCheckedBox(e) {
        this.setState({active: e.target.checked ? 1 : 0});
    }
}