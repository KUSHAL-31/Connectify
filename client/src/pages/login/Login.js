import React, { useContext, useRef } from 'react'
import './Login.css'
import { loginCall } from '../../contextApiCalls'
import { AuthContext } from '../../Context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const history = useHistory();

    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }

    console.log(user)

    const HandleNewAccount = () => {
        console.log("HEllo");
        history.push("/register")
    }

    return (
        <>
            <div className="login">
                <div className="login__wrapper">
                    <div className="login__left">
                        <h2 className="login__logo">Conne<span>ctify</span></h2>
                        <p className="login__desc">Want to connect with the outside world ?</p>
                        <p className="login__desc">Don't worry , Connectify is here !</p>
                    </div>
                    <div className="login__right">
                        <div className="login__box">
                            <input type="email" placeholder="Enter your email" className="login__input" ref={email} required />
                            <input type="password" placeholder="Enter your password" className="login__input" ref={password} required minLength="5" />
                            <button className="login__button" onClick={handleClick} disabled={isFetching} >{isFetching ? <CircularProgress color="white" size="20px" /> : "Login"}</button>
                            <span className="login__forgot">Forgot password?</span>
                            <button className="login__register" disabled={isFetching} onClick={HandleNewAccount}>{isFetching ? <CircularProgress color="white" size="20px" /> : "Create a new Account"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
