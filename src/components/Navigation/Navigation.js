import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <React.Fragment>
           <NavLink to="/">Home</NavLink>
            <NavLink to="/completed-tasks">completed tasks</NavLink> 
        </React.Fragment>
    );
};

export default Navigation;