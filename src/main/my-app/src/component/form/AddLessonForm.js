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
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        },
        defaultStart: "10:00",
        defaultEnd: "11:00"
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.startDateTime === null) {
            this.handleStartDateInput(this.state.defaultStart);
        }
        if (prevState.endDateTime === null) {
            this.handleEndDateInput(this.state.defaultEnd);
        }
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
            console.log("start " + this.state.startDateTime);
        });

        //todo: add 1 hour to end date

        // const endDate = new Date(utcDate);
        // endDate.setHours(currentDate.getHours() + 1);
        //
        // this.setState({endDateTime: endDate.getHours() + 1 + ":00"}, () => {
        //     console.log("end default" + this.state.endDateTime);
        // });
        // const utcEndDate = this.getUtc(endDate);
        // this.setState({endDateTime: utcEndDate}, () => {
        //     console.log("end " + this.state.endDateTime);
        // });
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
            repeatWeeks,
            weekdays
        } = this.state;


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
                <CustomTimePicker handleTime={this.handleStartDateInput} valueOfTime={this.state.defaultStart}/>
            </div>
            <div className="add-student-form-component">
                <label>End:</label>
                <CustomTimePicker handleTime={this.handleEndDateInput} valueOfTime={this.state.defaultEnd}/>
            </div>
            <div className="add-student-form-component">
                <label>Status:</label>
                <input value={this.state.status} onChange={(e) => this.handleStatusInput(e)}
                       className="add-student-form-input"/>
            </div>
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

            <div className="add-student-form-component">
                <button onClick={(e) => this.onSubmit(e)} className="add-student-form-button">Submit</button>
            </div>
        </div>
    }
}