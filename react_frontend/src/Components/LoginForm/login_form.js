import React from "react";
import { useState } from "react";
import './loginForm.css';

var loginEndPoint = "http://127.0.0.1:8091/login"

async function loginUser(credentials) {
    await fetch(loginEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => {
            console.log(res.headers.get('set-cookie')); // undefined
            console.log(document.cookie); // nope
            return res.json();
        }).then(json => {
            if (json.success) {
                console.log(json); // nope
            }
            else {
                console.log(json.error); // nope
            }
        });
    // .then(async (response) => {
    //     if (!response.ok) throw new Error(response);
    //     else return response.json(9);
    // })
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.log(error);
    // })
}

function Login_Form() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        const response = await loginUser({
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