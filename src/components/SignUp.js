import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './Signs.scss'
import padlock from './padlock.png'

const SignUp = () => {
    const emailregexp = /^(\w{3})+([.-]?\w+)*@(\w{2})+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordregexp = /^(?=.{8,30})(?=.*[A-Z])(?=.*[a-z])/
    let usersArray = JSON.parse(localStorage.getItem('users')) || []

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [securedPsw, setSecuredPsw] = useState('')
    let [wantsEmails, setWantsEmails] = useState(false)

    function handleName(e) {
        if (e.target.value.length < 3) {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "green";
            if (e.target.id === 'first-name') {
                setFirstName(firstName = e.target.value)
            } else {
                setLastName(lastName = e.target.value)
            }
        }
    }

    function handleEmail(e) {
        if (e.target.value.match(emailregexp)) {
            e.target.style.borderColor = "green";
            setEmail(email = e.target.value)
        } else {
            e.target.style.borderColor = "red";
        }
    }

    function handleEmailBlur(e) {
        if (usersArray.find(user => user.email === e.target.value)) {
            e.target.style.borderColor = "red";
            let message = document.querySelector('.message-email')
            message.innerText = 'Account with this email already exists. Please sign in'
        }
    }

    function handleEmailFocus() {
        let message = document.querySelector('.message-email')
        message.innerText = ''
    }

    function handlePassword(e) {
        if (e.target.value.match(passwordregexp)) {
            e.target.style.borderColor = "green";
            let password = e.target.value
            setSecuredPsw(securedPsw = btoa(password))
        } else {
            e.target.style.borderColor = "red";
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let checkValues = document.querySelectorAll('.check-value')
        for (let i = 0; i < checkValues.length; i++) {
            if (checkValues[i].style.borderColor === 'red') return;
        }
        for (let i = 0; i < checkValues.length; i++) {
            checkValues[i].value = '';
            checkValues[i].style.borderColor = '#535353'
        }
        if (document.querySelector('.checkbox').checked) setWantsEmails(wantsEmails = true)
        let user = {
            firstName,
            lastName,
            username: firstName + lastName,
            email,
            securedPsw,
            wantsEmails,
            remember: false,
        }
        usersArray.push(user)
        localStorage.setItem("users", JSON.stringify(usersArray))
        let alertMessage = document.querySelector('.alert')
        alertMessage.classList.remove('hidden')
    }

    return (
        <div className='container'>
            <div className='alert hidden'>Success! Now you can <NavLink className="underline-text" to="/sign-in">sign in</NavLink> to your account.</div>
            <div className='pink'><img className='padlock' src={padlock} alt=""></img></div>
            <h1 className='title'>Sign up</h1>
            <form>
                <div className='sides'>
                    <input onChange={handleName} className='small-input check-value' type="text" placeholder="First Name*" id="first-name" required></input>
                    <input onChange={handleName} className='small-input check-value' type="text" placeholder="Last Name*" id="last-name" required></input>
                </div>
                <input onFocus={handleEmailFocus} onBlur={handleEmailBlur} onChange={handleEmail} className="check-value" type="text" placeholder="Email Address*" required></input>
                <div className='message-email'></div>
                <input onChange={handlePassword} className="check-value" type="password" placeholder="Password*" required></input>
                <div>
                    <input type="checkbox" htmlFor="checkbox" className='checkbox'></input>
                    <label id="checkbox" className="label">I want to receive inspiration, marketing promotions and updates via email.</label>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn">Sign up</button>
            </form>
            <div className='sides'>
                <div></div>
                <NavLink className="blue-text" to="/sign-in">Already have an account? Sign in</NavLink>
            </div>
            <p className="copyright">Copyright © Your Website 2022</p>
            
        </div>
    );
};

export default SignUp;