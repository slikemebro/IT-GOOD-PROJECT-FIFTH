import React from 'react'
import './AddStudentForm.css';
import PropTypes from "prop-types";
import CustomTimePicker from "../custom-components/CustomTimePicker";

export class AddLessonForm extends React.PureComponent {

    static propTypes = {
        addRow: PropTypes.func
    }

    static defaultProps = {
        addRow: () => {
        }
    }


    state = {
        id: null,
        theme: "",
        startDateTime: null,
        endDateTime: null,
        status: 1,
        link: "",
        mode: 2,
        repeatWeeks: 1,
        weekdays: {
            monday: false,
            wednesday: false,
            thursday: false,
        },
    }

    handleThemeInput(e) {
        this.setState({theme: e.target.value});
    }

    handleStatusInput(e) {
        this.setState({status: e.target.value});
    }

    handleLinkInput(e) {
        this.setState({link: e.target.value});
    }


    handleStartDateInput = (e) => {
        const currentDate = new Date();
        currentDate.setHours(e.split(":")[0]);
        currentDate.setMinutes(e.split(":")[1]);

        const utcDate = this.getUtc(currentDate);

        this.setState({startDateTime: utcDate}, () => {
            console.log(this.state.startDateTime);
        });
    }

    handleEndDateInput = (e) => {
        const currentDate = new Date();
        currentDate.setHours(e.split(":")[0]);
        currentDate.setMinutes(e.split(":")[1]);

        const utcDate = this.getUtc(currentDate);

        this.setState({endDateTime: utcDate}, () => {
            console.log(this.state.endDateTime);
        });
    }

    getUtc = (localDate) => {
        console.log(localDate);
        const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes()));
        return utcDate.toISOString();
    }

    handleModeChange = (e) => {
        console.log(e);
        this.setState({mode: e.target.value});
    }

    handleRepeatWeeksInput = (e) => {
        this.setState({repeatWeeks: e.target.value});
    }

    handleWeekdayChange = (day) => {
        this.setState(prevState => ({
            weekdays: {
                ...prevState.weekdays,
                [day]: !prevState.weekdays[day]
            }
        }));
    }


    onSubmit = (e) => {
        e.preventDefault();
        const {
            id,
            theme,
            status,
            startDateTime,
            endDateTime,
            link,
            numberOfLessons,
            intervalDays,
            mode,
            repeatWeeks,
            weekdays
        } = this.state;

        if (mode === 1) {

            for (let i = 0; i < numberOfLessons; i++) {
                const start = new Date(startDateTime);
                start.setDate(start.getDate() + i * intervalDays);
                const end = new Date(endDateTime);
                end.setDate(end.getDate() + i * intervalDays);

                const DATA = {
                    id,
                    theme,
                    status,
                    link,
                    startDateTime: start.toISOString(),
                    endDateTime: end.toISOString()
                };
                this.props.addRow(DATA);
            }
        } else if (mode === 2) {
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const selectedDays = days.filter(day => weekdays[day]);

            for (let week = 0; week < repeatWeeks; week++) {
                selectedDays.forEach(day => {
                    const start = new Date(startDateTime);
                    const end = new Date(endDateTime);
                    const dayIndex = days.indexOf(day);

                    start.setDate(start.getDate() + ((7 + dayIndex - start.getDay()) % 7) + week * 7);
                    end.setDate(end.getDate() + ((7 + dayIndex - end.getDay()) % 7) + week * 7);

                    const DATA = {
                        id,
                        theme,
                        status,
                        link,
                        startDateTime: start.toISOString(),
                        endDateTime: end.toISOString()
                    };
                    this.props.addRow(DATA);
                });
            }
        }
    }

    handleNumberOfLessonsInput = (e) => {
        this.setState({numberOfLessons: e.target.value});
    }

    handleIntervalDaysInput = (e) => {
        this.setState({intervalDays: e.target.value});
    }

    render() {
        return <div className="add-student-form">
            <div className="add-student-form-component">
                <label>Theme:</label>
                <input value={this.state.theme} onChange={(e) => this.handleThemeInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Link:</label>
                <input value={this.state.link} onChange={(e) => this.handleLinkInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Start:</label>
                <CustomTimePicker handleTime={this.handleStartDateInput} valueOfTime={"10:00"}/>
            </div>
            <div className="add-student-form-component">
                <label>End:</label>
                <CustomTimePicker handleTime={this.handleEndDateInput} valueOfTime={"11:00"}/>
            </div>
            <div className="add-student-form-component">
                <label>Status:</label>
                <input value={this.state.status} onChange={(e) => this.handleStatusInput(e)}
                       className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Mode:</label>
                <select value={this.state.mode} onChange={(e) => this.handleModeChange(e)}
                        className="add-student-form-input">
                    <option value={1}>Interval and Count</option>
                    <option value={2}>Weekdays</option>
                </select>
            </div>
            {this.state.mode === 2 && (
                <>
                    <div className="add-student-form-component">
                        <label>Repeat for Weeks:</label>
                        <input
                            type="number"
                            min="1"
                            value={this.state.repeatWeeks}
                            onChange={this.handleRepeatWeeksInput}
                            className="add-student-form-input"/>
                    </div>
                    {Object.keys(this.state.weekdays).map(day => (
                        <div key={day} className="add-student-form-component">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={this.state.weekdays[day]}
                                    onChange={() => this.handleWeekdayChange(day)}/>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </label>
                        </div>
                    ))}
                </>
            )}
            <div className="add-student-form-component">
                <label>Number of Lessons:</label>
                <input
                    type="number"
                    min="1"
                    value={this.state.numberOfLessons}
                    onChange={this.handleNumberOfLessonsInput}
                    className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <label>Days Between Lessons:</label>
                <input
                    type="number"
                    min="1"
                    value={this.state.intervalDays}
                    onChange={this.handleIntervalDaysInput}
                    className="add-student-form-input"/>
            </div>
            <div className="add-student-form-component">
                <button onClick={(e) => this.onSubmit(e)} className="add-student-form-button">Submit</button>
            </div>
        </div>
    }
}