import React from 'react';
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './Signs.scss' 

const WelcomePage = () => {
    let {username} = useParams()
    let usersArray = JSON.parse(localStorage.getItem('users'))
    let user = usersArray.find(user => user.username === username)
    return (
        <div className='container'>
            <div>
                <span><NavLink className="sign-out" to="/sign-in">sign out</NavLink></span>
            </div>
            <p className='welcome'>Welcome, {user.firstName} {user.lastName}</p>
            <img className='cat' src="https://images.unsplash.com/photo-1562009910-830d74050500?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhdHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60" alt=""></img>
        </div>
    );
};

export default WelcomePage;