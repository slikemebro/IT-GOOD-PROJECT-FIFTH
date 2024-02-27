import React from 'react'
import {findAllStudents, saveOrUpdateStudent} from "../request/student";
import {Student} from "../domain/Student";
import {AbstractUsersTable} from "../component/table/AbstractUsersTable";
import {AddStudentForm} from "../component/form/AddStudentForm";

export class StudentPage extends React.Component {

    state = {
        students: [],
    }

    componentDidMount() {
        this.loadStudents();
    }

    loadStudents() {
        findAllStudents().then((data) => {
            const students = data.body.map( (student) => new Student(student));
            this.setState({students});
        })
    }

    addRow(data) {
        saveOrUpdateStudent(data).then( () => {
            this.loadStudents();
        });
    }

    getColumns() {
        return [{
            name: 'Surname',
            accessor: "surname",
        },
            {
                name: 'Contacts',
                accessor:  'contacts'
            },
            {
                name: 'Amount',
                accessor: 'lessonsAmount'
            },
            {
                name: 'Active',
                accessor: 'active'
            },
            {
                name: "",
                accessor: 'edit'
            }
        ]
    }


    render() {
        const columns = this.getColumns();

        return (
            <div>
                <AbstractUsersTable data={this.state.students} manager={"student"} addRow={(data) => this.addRow(data)} columns={columns} studentPage={true}/>
            </div>
        );

    }


}