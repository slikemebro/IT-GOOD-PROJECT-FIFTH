import React from 'react';
import {findAllSalary, saveSalary} from "../request/salary";
import {Salary} from "../domain/Salary";
import {AbstractUsersTable} from "../component/table/AbstractUsersTable";

export class SalaryPage extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.loadSalaryList();
    }

    loadSalaryList() {
        findAllSalary().then((res) => {
            this.setState({data: res.body.map((row) => new Salary(row))})
        })
    }

    saveSalary(data) {
        saveSalary(new Salary(data).requestObject).then(() => this.loadSalaryList());
    }

    getColumns() {
        return [{
            name: "Teacher ID",
            accessor: "teacherId"
        },
            {
                name: "Teacher Name",
                accessor: "teacherName"
            },
            {
                name: "Teacher Surname",
                accessor: "teacherSurname"
            },
            {
                name: "Amount",
                accessor: "amount"
            },
            {
                name: "Date Time",
                accessor: "dateTime"
            },
        ]
    }

    render() {
        return (
            <div>
                <AbstractUsersTable manager={"salary"} addRow={(data) => this.saveSalary(data)} data={this.state.data}
                                    columns={this.getColumns()}/>
            </div>
        );
    }
}
