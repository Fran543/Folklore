import React from "react";
import { useEffect, } from "react";
import { NotificationContainer } from 'react-notifications';
import { default as createNotification } from "../../Utils/createNotification";


import { RegisterForm, LoginForm } from "../../Components";
import { Helmet } from "react-helmet";

function Login() {


    useEffect(() => {
        import('./login.css');
        import('react-notifications/lib/notifications.css');
    }, [])

    return (
        <div>

            <div className="alert show showAlert ">
                <span className="fas fa-exclamation-circle"></span>
                <span className="msg"></span>
                <div className="close-btn">
                    <span className="fas fa-times"></span>
                </div>
            </div>
            <div className="success ">
                <span className="fas fa-exclamation-circle"></span>
                <span className="msg"></span>
                <div className="close-btn">
                    <span className="fas fa-times"></span>
                </div>
            </div>
            <div id="bg"></div>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <RegisterForm createNotification={(type, message) => createNotification(type, message)} />
                </div>
                <div className="form-container sign-in-container">
                    <LoginForm createNotification={(type, message) => createNotification(type, message)} />
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" type="button" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" type="button" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
            <Helmet>
                <script src=
                    ".\loginBox.js" />
                <script src=
                    ".\particles.js" />
            </Helmet>
        </div >

    );
}

export default Login;