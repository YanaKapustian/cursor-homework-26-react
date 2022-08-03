import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './Signs.scss'
import padlock from './padlock.png'

const SignIn = () => {
    let usersArray = JSON.parse(localStorage.getItem('users'))
    let navigate = useNavigate();

    function handleSignIn(e) {
        e.preventDefault();
        let emailInput = document.querySelector('.email-input')
        let passwordInput = document.querySelector('.password-input')
        let message = document.querySelector('.message')
        let user = usersArray.find(user => user.email === emailInput.value)
        if (document.querySelector('.checkbox').checked) {
            let i = usersArray.indexOf(user)
            usersArray[i].remember = true;
            localStorage.setItem("users", JSON.stringify(usersArray))
        }
        if (user) {
            if (user.securedPsw === btoa(passwordInput.value)) {
                message.innerText = '';
                navigate(`/${user.username}`)
            } else {
                message.innerText = 'Incorrect password. Please try again'
            }
        } else {
            message.innerText = 'Email is not found. Please sign up first'
        }
    }

    async function handleBlur(e) {
        let user = await usersArray.find(user => user.email === e.target.value)
        if (!user) return;
        if (user.remember) {
            let passwordInput = document.querySelector('.password-input')
            passwordInput.value = atob(user.securedPsw);
        }
    }
    
    return (
        <div className='container'>
            <div className='pink'><img className='padlock' src={padlock} alt=""></img></div>
            <h1 className='title'>Sign in</h1>
            <form>
                <input onBlur={handleBlur} type="text" placeholder="Email Address*" className='email-input' autoComplete='on' required></input>
                <input type="password" placeholder="Password*" className='password-input' required></input>
                <div>
                    <input type="checkbox" htmlFor="checkbox" className='checkbox'></input>
                    <label id="checkbox" className="label">Remember me</label>
                </div>
                <div className='message'></div>
                <button onClick={handleSignIn} type="submit" className="btn">Sign in</button>
            </form>
            <div className='sides'>
                <div className='blue-text'>Forgot password?</div>
                <NavLink className="blue-text" to="/sign-up">Don't have an account? Sign up</NavLink>
            </div>
            <p className="copyright">Copyright © Your Website 2022</p>
        </div>
    );
};

export default SignIn;