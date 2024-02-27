import React from 'react'
import PropTypes from "prop-types";

export class TimeChoose extends React.PureComponent {

    static propTypes = {
        handleStartDateInput: PropTypes.func,
        handleEndDateInput: PropTypes.func,
    }

    static defaultProps = {
        handleStartDateInput: () => {},
        handleEndDateInput: () => {},
    }



    render() {
        return (
            <>
                <div className="form-group">
                    <label htmlFor="startDateTime">Start date and time</label>
                    <input className="form-control"
                           onChange={(e) => this.handleStartDateInput(e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="endDateTime">End date and time</label>
                    <input className="form-control"
                           onChange={(e) => this.handleEndDateInput(e)}/>
                </div>
            </>
        )
    }

}