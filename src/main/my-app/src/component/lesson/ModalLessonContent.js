import React from 'react'
import PropTypes from "prop-types";
import {Lesson} from "../../domain/Lesson";
import {ModalLessonDate} from "./ModalLessonDate";
import {ModalLessonRow} from "./ModalLessonRow";
import './css/ModalLessonContent.css';
import {AddLessonForm} from "../form/AddLessonForm";
import {findLessonByTeacherId, findLessonsByIds, saveLesson} from "../../request/lesson";
import {getTableById, getTableByTeacherId} from "../../request/table";
import {findSalaryByTeacherId} from "../../request/salary"
import {Table} from "../../domain/Table";
import {findStudentById} from "../../request/student";
import {Student} from "../../domain/Student";
import {Salary} from "../../domain/Salary";

function groupLessonsByDate(lessons) {
    const lessonsByDate = new Map();
    lessons.sort((b, a) => new Date(a.startDateTime) - new Date(b.startDateTime));

    lessons.forEach(lesson => {
        const startDate = new Date(lesson.startDateTime).toDateString();
        if (!lessonsByDate.has(startDate)) {
            lessonsByDate.set(startDate, []);
        }
        lessonsByDate.get(startDate).push(lesson);
    });

    return lessonsByDate;
}

export class ModalLessonContent extends React.PureComponent {

    static propTypes = {
        tableId: PropTypes.number,
        userRole: PropTypes.string,
        teacherId: PropTypes.number,
    }

    static defaultProps = {
        tableId: null,
        userRole: null,
        teacherId: null,
    }

    state = {
        lessons: [],
        table: {},
        student: {},
        tables: [],
        earnedMoney: 0,
        lastSalary: null,
        groupedLessons: new Map(),
        nonTables: false,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.lessons !== this.state.lessons) {
            const groupedLessons = groupLessonsByDate(this.state.lessons);
            this.setState({groupedLessons});
        }
    }

    loadTableWithLessons() {
        getTableById(this.props.tableId).then(
            (res) => {
                this.setState({table: new Table(res.body)}, () => {
                    findLessonsByIds(this.state.table.lessonIds).then((resLessons) => {
                        const LESSONS = resLessons.body.map((l) => new Lesson(l));
                        this.setState({lessons: LESSONS}, () => {
                            findStudentById(this.state.table.studentId).then((res) => {
                                this.setState({student: new Student(res.body)});
                            })
                        });
                    })
                })
            }
        )

    }

    loadAllTableWithLessonsByTeacher() {
        this.getEarnedMoney();
        getTableByTeacherId(this.props.teacherId).then((res) => {
            const TABLES = res.body.map((table) => new Table(table));
            if (this.state.tables.length === 0) {
                this.setState({tables: TABLES}, () => {
                    this.findLessons();
                });
            }
        }).catch((error) => {
            console.log(error);
            this.setState({nonTables: true});
        });
    }

    findLessons() {
        findLessonByTeacherId(this.props.teacherId).then((res) => {
            const LESSONS = res.body.map((l) => new Lesson(l));
            this.setState({lessons: LESSONS}, () => {
                this.state.tables.forEach((table) => {
                    findStudentById(table.studentId).then((res) => {
                        this.setState({student: new Student(res.body)});
                    });
                });
                this.getEarnedMoney();
            });
        });
    }

    componentDidMount() {
        if (this.props.userRole === "TEACHER") {
            this.loadAllTableWithLessonsByTeacher();
        } else {
            this.loadTableWithLessons();
        }
    }

    addRow(data) {
        const DATA = {
            ...data,
            teacherId: this.state.table.teacherId,
            studentId: this.state.table.studentId,
        }

        const lesson = new Lesson(DATA).requestObject;

        saveLesson(lesson, this.props.tableId).then(() => {
            this.loadTableWithLessons();
        })
    }

    operateLesson(data, id) {
        const DATA = {
            ...data,
            teacherId: this.state.table.teacherId,
            studentId: this.state.table.studentId,
            id: id
        }

        const lesson = new Lesson(DATA).requestObject;

        saveLesson(lesson, this.props.tableId).then(() => {
            this.loadTableWithLessons();
        });
    }

    isAdmin() {
        return this.props.userRole === "ADMIN";
    }

    getEarnedMoney() {
        let earnedMoney = 0;
        findSalaryByTeacherId(this.props.teacherId).then((res) => {
            res.body.map((s) => new Salary(s));
            res.body.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

            this.setState({lastSalary: res.body[0]}, () => {
                // console.log("lastSalary: " + this.state.lastSalary.dateTime);
            });
            //todo the low date

            this.state.lessons.forEach((lesson) => {
                if (this.state.lastSalary != null) {
                    if (lesson.status === 2 && this.state.lastSalary.dateTime < lesson.startDateTime) {
                        earnedMoney += 130;
                    }
                } else {
                    if (lesson.status === 2) {
                        earnedMoney += 130;
                    }
                }
            });
            this.setState({earnedMoney: earnedMoney});

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        return (
            <div className="modal-lesson-content">
                {this.isAdmin() ? (
                    <AddLessonForm addRow={(data) => this.addRow(data)}/>
                ) : (
                    <div>
                        {this.state.nonTables ? (
                            <h2>You don't have any lessons</h2>
                        ) : (
                            <>
                                {this.showLastSalary()}
                                <h2>Lessons</h2>
                            </>
                        )}
                    </div>
                )
                }

                {Array.from(this.state.groupedLessons.keys()).map(date => {
                    const completedLessonsCount = this.state.groupedLessons.get(date).filter(lesson => lesson.status === 2).length;
                    return (
                        <div key={date}>
                            <ModalLessonDate date={date} completedLessonsCount={completedLessonsCount}/>
                            {this.state.groupedLessons.get(date).map(lesson => (
                                <ModalLessonRow
                                    key={lesson.id}
                                    fromDate={lesson.startDateTime}
                                    toDate={lesson.endDateTime}
                                    status={lesson.status}
                                    student={this.state.student}
                                    theme={lesson.theme}
                                    link={lesson.link}
                                    operateLesson={(data) => this.operateLesson(data, lesson.id)}
                                    userRole={this.props.userRole}
                                    teacherId={lesson.teacherId}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }

    showLastSalary() {
        if (this.state.lastSalary) {
            const date = new Date(this.state.lastSalary.dateTime);
            const formattedDate = date.toLocaleDateString();
            return (
                <>
                    <>Last Salary was at {formattedDate} and it was {this.state.lastSalary.amount} hryvnias</>
                    <br/>
                    <>Earned Money: {this.state.earnedMoney} hryvnias</>
                </>
            )
        } else {
            return (
                <>
                    <>You don't have any salary yet</>
                    <br/>
                    <>Earned Money: {this.state.earnedMoney} hryvnias</>
                </>
            )
        }
    }
}