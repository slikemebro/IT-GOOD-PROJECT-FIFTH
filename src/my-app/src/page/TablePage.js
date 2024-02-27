import React from 'react'
import {TableCard} from "../component/teacher-student-table/TableCard";
import {ModalLessonRow} from "../component/lesson/ModalLessonRow";
import {getTableById, getTableNames, saveOrUpdateTable} from "../request/table";
import {TeacherStudentTable} from "../domain/TeacherStudentTable";
import {findLessonsByIds} from "../request/lesson";
import {Lesson} from "../domain/Lesson";
import {AddTableForm} from "../component/form/AddTableForm";
import PropTypes from "prop-types";

export class TablePage extends React.Component {

    static propTypes = {
        onShowLessons : PropTypes.func,
    }

    static defaultProps = {
        lessons: []
    }


    state = {
        searchTerm: "",
        showModal: false,
        data: [],
        currentLessons: [],
        selectedTeacher: {},
        selectedStudent: {}
    }

    componentDidMount() {
        this.loadTables();
    }

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    loadTables() {
        getTableNames().then((data) => {
            if (!!data.body) {
                const TABLES = data.body.map((table) => new TeacherStudentTable(table));
                this.setState({data: TABLES});
            }
        })
    }

    handleClose() {
        this.setState({showModal: !this.state.showModal})
    }

    handleOpen(table) {
        this.props.onShowLessons(table);
    }

    render() {
        return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "100px", padding: "20px", paddingLeft: "15%", paddingRight: "15%"}}>
            <AddTableForm onSubmit={(data) => this.addTable(data)}/>
            </div>
        <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "100px", padding: "20px", paddingLeft: "15%", paddingRight: "15%"}}>
            <input
                type="text"
                placeholder="Поиск..."
                value={this.state.searchTerm}
                onChange={this.handleSearch}
                className="search-box"
            />
            {
                this.state.data.map((table) => {
                   return <TableCard onClick={(table) => this.handleOpen(table)} tableId={table.tableId} studentName={table.studentName} teacherName={table.teacherName} active={table.active}/>
                })
            }

        </div>
        </div>
        )

    }

    getLessonsModalContent() {
        return <>
            {
                this.state.currentLessons.map((lesson) => {
                    return <ModalLessonRow fromDate={lesson.startDateTime} toDate={lesson.endDateTime}
                                           status={lesson.status}/>
                })
            }
        </>;
    }

    addTable(table) {
        saveOrUpdateTable(table).then(() => this.loadTables());
    }
}