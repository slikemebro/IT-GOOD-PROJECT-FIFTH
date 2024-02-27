import logo from './logo.svg';
import './App.css';
import HoverNavbar from "./component/navbar/HoverNavbar";
import {useEffect, useState} from "react";
import {StudentPage} from "./page/StudentPage";
import {TeacherPage} from "./page/TeacherPage";
import {TablePage} from "./page/TablePage";
import {PaymentPage} from "./page/PaymentPage";
import {ModalLessonContent} from "./component/lesson/ModalLessonContent";
import {SalaryPage} from "./page/SalaryPage";
import {AuthPage} from "./page/AuthPage";
import {SwitchToTeacherPage} from "./page/SwitchToTeacherPage";
import {currentUser, verifyToken} from "./request/auth";
import {wait} from "@testing-library/user-event/dist/utils";


function App() {

    const [activeTab, setActiveTab] = useState('Auth');
    const [tableId, setTableId] = useState(null);
    const [showLessons, setShowLessons] = useState(false);
    const [logged, setLog] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [teacherId, setTeacherId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            verifyToken().then(() => {
                setLog(true);

                console.log("verified");
                getCurrentUser();
            }).catch((error) => {
                  console.log(error);
                  setLog(false);
            });
        }
    }, []);

    useEffect(() => {
        if (logged) {
            changeTab('Table');
        }
    }, [userRole]);


    const isAdmin = () => {
        return userRole === "ADMIN";
    }

    const getCurrentUser = () => {
        currentUser().then((data) => {
            setUserRole(data.body.role);
            console.log("userRole: " + userRole + " " + data.body.role);
            setTeacherId(data.body.teacherId);
            console.log("teacherId: " + teacherId + " " + data.body.teacherId);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onLogin = () => {
        getCurrentUser();
        console.log("call logged in");
        setLog(true);
    }

    const onLogout = () => {
        setLog(false);
        setUserRole(null);
    }

    const changeTab = (tabName) => {
        console.log("change tab to " + tabName);
        if (tabName === 'Table' && !isAdmin()) {
            console.log("open lessons for teacher " + !isAdmin());
            setShowLessons(true);
        } else {
            setShowLessons(false);
            console.log("open lessons for admin " + isAdmin());
        }
        setActiveTab(tabName);
    }

    const onShowLessons = (tableIdResponse) => {
        setTableId(tableIdResponse);
        setShowLessons(true);
    }

    return (
        <div className="App">
            <HoverNavbar onActiveTab={changeTab} logged={logged} activeTabFromRoot={activeTab} role={userRole}/>
            {
                activeTab === 'Student' && <StudentPage/> ||
                activeTab === 'Teacher' && <TeacherPage/> ||
                activeTab === 'Table' && !showLessons &&
                <TablePage onShowLessons={(tableId) => onShowLessons(tableId)}/> ||
                activeTab === 'Payment' && <PaymentPage/> ||
                activeTab === 'Salary' && <SalaryPage/> ||
                activeTab === 'Switch to teacher' && <SwitchToTeacherPage/> ||
                activeTab === "Auth" && <AuthPage onLogin={() => onLogin()} onLogout={() => onLogout()} logged={logged}/>
            }
            {
                showLessons && <ModalLessonContent tableId={tableId} userRole={userRole} teacherId={teacherId}/>
            }
        </div>
    );
}

export default App;
