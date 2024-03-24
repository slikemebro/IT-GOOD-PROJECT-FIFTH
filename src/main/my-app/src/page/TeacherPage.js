import React from 'react'
import {AbstractUsersTable} from "../component/table/AbstractUsersTable";
import {findAllTeachers, saveOrUpdateTeacher} from "../request/teacher";
import {findUserByTeacherId} from "../request/auth";
import {findFirstLoginByUserId} from "../request/first-login";
import {Teacher} from "../domain/Teacher";
import {UserInfoFile} from "../domain/UserInfoFile";

export class TeacherPage extends React.Component {

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

    addTeacher(teacher) {
        console.log("addTeacher");
        saveOrUpdateTeacher(teacher).then((savedTeacher) => {
            console.log("findUserByTeacherId" + savedTeacher.body.id);
            findUserByTeacherId(savedTeacher.body.id).then((data) => {
                let userInfoForFile = new UserInfoFile(data.body);
                findFirstLoginByUserId(data.body.id).then((firstLogin) => {
                    userInfoForFile.password = firstLogin.body.password;
                    this.generateUserJsonFile(userInfoForFile.requestObject);
                    this.loadTeachers();
                });
            });
        });
    }

    updateTeacher = (teacher) => {
        saveOrUpdateTeacher(teacher).then((savedTeacher) => {
            console.log("UpdateTeacher " + savedTeacher.body.id);
            this.loadTeachers();
        });
    }

    generateUserJsonFile(user) {
        const content = `Email: ${user.email}\nPassword: ${user.password}`;

        const blob = new Blob([content], {type: 'text/plain'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user ' + user.email + '.txt');
        document.body.appendChild(link);
        link.click();
    };

    getColumns() {
        return [{
            name: 'Name',
            accessor: "name",
        },
            {
                name: 'Surname',
                accessor: 'surname'
            },
            {
                name: 'Contacts',
                accessor: 'contacts'
            },
            {
                name: 'Card Number',
                accessor: 'cardNumber'
            },
            {
                name: 'Active',
                accessor: 'active'
            },
            {
                name: 'Joined',
                accessor: 'joined'
            },
            {
                name: '',
                accessor: "edit"
            }
        ]
    }


    render() {
        const columns = this.getColumns();

        return (
            <div>
                <AbstractUsersTable data={this.state.teachers} columns={columns} manager={"teacher"}
                                    addRow={(data) => this.addTeacher(data)} updateTeacher={this.updateTeacher}/>
            </div>
        );

    }


}