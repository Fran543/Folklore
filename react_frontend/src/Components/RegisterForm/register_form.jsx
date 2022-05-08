import { useState } from "react";
import { useEffect } from "react";



var registerEndPoint = "http://127.0.0.1:8091/register"

async function registerUser(credentials) {

    fetch(registerEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(async (response) => {
            var msg = await response.text()
            if (!response.ok) throw new Error(msg);
            else return msg;
        })
        .then((data) => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function Register_Form() {

    useEffect(() => {
        import('./registerForm.css');
    })


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const register = async (e) => {
        e.preventDefault();
        await registerUser({
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