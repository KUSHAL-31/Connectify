import axios from 'axios';
import React, { useRef } from 'react'
import { useHistory } from 'react-router';
import './Register.css'

const Register = () => {

    const history = useHistory();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleClick = async (e) => {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            alert("Password donot match")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user)
                history.push("/login")
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <div className="register">
                <div className="register__wrapper">
                    <div className="register__left">
                        <h2 className="register__logo">Conne<span>ctify</span></h2>
                        <p className="register__desc">Want to connect with the outside world ?</p>
                        <p className="register__desc">Don't worry , Connectify is here !</p>
                    </div>
                    <div className="register__right">
                        <div className="register__box">
                            <input placeholder="Enter your Username" className="register__input" ref={username} required />
                            <input type="email" placeholder="Enter your email" className="register__input" ref={email} required />
                            <input type="password" placeholder="Enter your password" className="register__input" ref={password} required minLength="5" />
                            <input type="password" placeholder="Confirm password" className="register__input" ref={confirmPassword} required minLength="5" />
                            <button className="register__button" onClick={handleClick}>Sign up</button>
                            <button className="register__register">Log into your Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
