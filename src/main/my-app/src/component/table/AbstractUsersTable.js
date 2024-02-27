import React from "react";
import PropTypes from 'prop-types';
import {Student} from "../../domain/Student";
import "./_abstract_users_table.css";
import {AddStudentForm} from "../form/AddStudentForm";
import {AddTeacherForm} from "../form/AddTeacherForm";
import {AddPaymentForm} from "../form/AddPaymentForm";
import {AddSalaryForm} from "../form/AddSalaryForm";

export class AbstractUsersTable extends React.PureComponent {

    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            accessor: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })),
        data: PropTypes.arrayOf(PropTypes.object),
        addRow: PropTypes.func,
        manager: PropTypes.string,
        switchToTeacher: PropTypes.func,
        studentPage: PropTypes.bool
    }

    static defaultProps = {
        columns: [],
        data: [],
        addRow: () => {
        },
        manager: ""
    }

    state = {
        searchTerm: '',
        toEdit: null
    }

    handleSearch = (e) => {
        this.setState({searchTerm: e.target.value});
    }

    getAddForm() {
        if (this.props.manager === "student") return <AddStudentForm addRow={(data) => this.props.addRow(data)}
                                                                     student={this.state.toEdit}/>
        if (this.props.manager === "teacher") return <AddTeacherForm addRow={(data) => this.props.addRow(data)}
                                                                     teacher={this.state.toEdit}/>
        if (this.props.manager === "payment") return <AddPaymentForm addRow={(data) => this.props.addRow(data)}/>
        if (this.props.manager === "salary") return <AddSalaryForm addRow={(data) => this.props.addRow(data)}/>
    }

    renderHeaders() {
        return this.props.columns.map((column, index) => (
            <div key={index} className="abstract-table-header">
                {column.name}
            </div>
        ));
    }

    onEdit(row) {
        this.setState({toEdit: row});
    }

    renderRows() {
        //todo: add teacher name and surname to salary
        const {searchTerm} = this.state;
        const filteredData = this.props.data.filter(student =>
            this.props.columns.some(column =>
                String(student[column.accessor]).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        console.log(filteredData);
        //todo
        if (this.props.studentPage) {
            filteredData.sort((a, b) => a.lessonsAmount - b.lessonsAmount);
        }
        return filteredData.map((student, index) => (
            <div key={index} className="abstract-table-row"
                 //todo
                 style={{backgroundColor: this.props.studentPage ?
                         student.lessonsAmount > 5 ? student.lessonsAmount < 10 ? '#FF5733' : '#90ee90' : '#FFCCCB' : 'white'}}>
                {this.props.columns.map((column, colIndex) => (
                    <div key={colIndex} className="abstract-table-data">
                        {column.accessor === 'active' ? (
                            <div
                                className="status-circle"
                                style={{backgroundColor: student.active ? 'green' : 'red'}}
                            />
                        ) : column.accessor === 'lessonsAmount' && student[column.accessor] === null ? (
                            0
                        ) : column.accessor === 'edit' ? (
                            <div className="abstract-table-data">
                                <button onClick={() => this.onEdit(student)}>Edit</button>
                            </div>
                        ) : column.accessor === 'switch' ? (
                                <div className="abstract-table-data">
                                    <button onClick={() => this.props.switchToTeacher(student.id)}>Switch</button>
                                </div>
                            )
                            :
                            (
                                student[column.accessor]
                            )}
                    </div>
                ))}
            </div>
        ));
    }

    render() {
        return (
            <div className="abstract-table-container">
                <input

                    type="text"
                    placeholder="Поиск..."
                    value={this.state.searchTerm}
                    onChange={this.handleSearch}
                    className="search-box"
                />
                {
                    this.getAddForm()
                }
                <div className="abstract-table">
                    <div className="abstract-table-row header">
                        {this.renderHeaders()}
                    </div>
                    {this.renderRows()}
                </div>
            </div>
        );
    }
}