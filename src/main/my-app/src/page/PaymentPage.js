import React from 'react'
import {findAllPayments, savePayment} from "../request/payment";
import {Payment} from "../domain/Payment";
import {AbstractUsersTable} from "../component/table/AbstractUsersTable";

export class PaymentPage extends React.Component {

    state = {
        payments: []
    }

    componentDidMount() {
        this.loadPayments();
    }

    loadPayments() {
        findAllPayments().then((data) => {
            if (!!data.body) {
                const payments = data.body.map((model) => new Payment(model));
                this.setState({payments});
            }
        })
    }

    addRow(data) {
        const payment = new Payment(data).requestObject;

        savePayment(payment).then(() => this.loadPayments());
    }

    getColumns() {
        return [{
            name: "Student",
            accessor: "studentId"
        },
            {
                name: "Student Name",
                accessor: "studentName"
            },
            {
                name: "Student Surname",
                accessor: "studentSurname"
            },
            {
                name: "Amount",
                accessor: "amount"
            },
            {
                name: "Lessons",
                accessor: "lessonsAmount"
            },
            {
                name: "Date",
                accessor: "paymentDateTime"
            }]
    }

    render() {
        return (
            <div>
                <AbstractUsersTable manager={"payment"} addRow={(data) => this.addRow(data)} data={this.state.payments}
                                    columns={this.getColumns()}/>
            </div>
        )
    }
}