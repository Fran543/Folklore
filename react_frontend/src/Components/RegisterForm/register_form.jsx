import { useState } from "react";
import { useEffect } from "react";



var registerEndPoint = "http://127.0.0.1:8091/register"



function Register_Form({ createNotification }) {


    useEffect(() => {
        import('./registerForm.css');
    })


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const registerUser = (credentials) => {

        fetch(registerEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message.message;
            })
            .then(async (data) => {
                createNotification('success', data)
                console.log(data);
            })
            .catch(error => {
                createNotification('error', error.message)
                console.log(error);

            })
    }

    const register = async (e) => {
        e.preventDefault();
        registerUser({
            username,
            email,
            password,
            passwordConfirm
        });
    }

    return (
        <form id="registerForm" onSubmit={register}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Username" name="username" id="username" maxLength="50" required value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" name="email" id="email" maxLength="50" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" name="password" id="password" maxLength="100" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm password" name="passwordConfirm" id="passwordConfirm"
                maxLength="100" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            <button>Sign Up</button>
        </form>
    );
}

export default Register_Form;