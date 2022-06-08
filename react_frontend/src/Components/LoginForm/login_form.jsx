import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EndPoints from "../../constants/endPoints";


var loginEndPoint = EndPoints.loginEndPoint




function Login_Form({ createNotification }) {

    useEffect(() => {
        import('./loginForm.css');
    })


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = (credentials) => {
        fetch(loginEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message.message;
            })
            .then(async (data) => {
                localStorage.setItem("isLoggedIn", true)
                navigate("/")
            })
            .catch(error => {
                localStorage.setItem("isLoggedIn", false)
                createNotification('error', error.message)
            })
    }

    const login = async (e) => {
        e.preventDefault();
        await loginUser({
            email,
            password
        });
    }

    return (
        <form id="loginForm" onSubmit={login}>
            <h1>Sign in</h1>
            <input type="email"
                placeholder="Email"
                id="lEmail"
                maxLength="50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                id="lPassword" maxLength="100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <a href="/">Continue as guest</a>
            {/* <!-- Write it down next time --> */}
            <button>Sign In</button>
        </form>
    );
}

export default Login_Form;