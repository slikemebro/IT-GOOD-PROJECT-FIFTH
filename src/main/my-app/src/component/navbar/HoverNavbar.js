import React, {useEffect, useRef, useState} from 'react';
import './HoverNavbar.css';

const HoverNavbar = ({onActiveTab, logged, activeTabFromRoot, role}) => {
    const navbarRef = useRef(null);
    const [rippleStyle, setRippleStyle] = useState({});
    let tabs = [];
    if (logged && role === 'ADMIN') {
        tabs = ['Student', 'Teacher', 'Table', 'Payment', 'Salary', 'Switch to teacher', 'Auth'];
    } else if (logged) {
        tabs = ['Table', 'Auth'];
    } else {
        tabs = ['Auth'];
    }


    const changeTab = (tabName) => {
        onActiveTab(tabName);
    }

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        const activeTabElement = navbar.querySelector(`.${activeTabFromRoot}`);
        if (!activeTabElement) return;

        const {left, width} = activeTabElement.getBoundingClientRect();
        const navbarLeft = navbar.getBoundingClientRect().left;

        setRippleStyle({
            left: `${left - navbarLeft}px`,
            width: `${width}px`,
            transition: 'left 0.3s ease, width 0.3s ease'
        });
    }, [activeTabFromRoot]);

    return (
        <div className="navbar" ref={navbarRef}>
            <div className="ripple" style={rippleStyle}/>
            {tabs.map(tab => (
                <div
                    key={tab}
                    className={`tab ${activeTabFromRoot === tab ? 'active' : ''}`}
                    onClick={() => changeTab(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export default HoverNavbar;
