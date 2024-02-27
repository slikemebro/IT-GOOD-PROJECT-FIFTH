import React from "react";
import {findAllTeachers} from "../request/teacher";
import {switchUser} from "../request/auth";
import {Teacher} from "../domain/Teacher";
import {AbstractUsersTable} from "../component/table/AbstractUsersTable";

export class SwitchToTeacherPage extends React.Component {

    state = {
        teachers: [],
    }

    componentDidMount() {
        this.loadTeachers();
    }

    loadTeachers() {
        findAllTeachers().then((data) => {
            const teachers = data.body.map((teacher) => new Teacher(teacher));
            this.setState({teachers});
        })
    }

    switchToTeacher(teacherId) {
        console.log("switch to teacher: " + teacherId);
        switchUser(teacherId).then((data) => {
            localStorage.setItem('token', data.body.token);
            window.location.reload();
        });
    }


    getColumns() {
        return [
            {
                name: "Id",
                accessor: "id"
            },
            {
                name: "Name",
                accessor: "name"
            },
            {
                name: "Surname",
                accessor: "surname"
            },
            {
                name: "Contacts",
                accessor: "contacts"
            },
            {
                name: "Active",
                accessor: "active"
            },
            {
                name: "",
                accessor: "switch"
            }
        ]
    }

    render() {
        const columns = this.getColumns();

        return (
            <div>
                <AbstractUsersTable data={this.state.teachers} columns={columns}
                                    switchToTeacher={this.switchToTeacher}/>
            </div>
        );
    }
}