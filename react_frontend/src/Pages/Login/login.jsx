import React from "react";
import './login.css';
import { Helmet } from "react-helmet";

function Login() {
    return (
        <div>
            <div class="alert hide">
                <span class="fas fa-exclamation-circle"></span>
                <span class="msg"></span>
                <div class="close-btn">
                    <span class="fas fa-times"></span>
                </div>
            </div>
            <div class="success hide">
                <span class="fas fa-exclamation-circle"></span>
                <span class="msg"></span>
                <div class="close-btn">
                    <span class="fas fa-times"></span>
                </div>
            </div>

            <div id="bg"></div>
            <div class="container" id="container">
                <div class="form-container sign-up-container">
                    <form id="registerForm">
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Username" name="username" id="username" maxlength="50" required />
                        <input type="email" placeholder="Email" name="email" id="email" maxlength="50" required />
                        <input type="password" placeholder="Password" name="password" id="password" maxlength="100" required />
                        <input type="password" placeholder="Confirm password" name="passwordConfirm" id="passwordConfirm"
                            maxlength="100" required />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form id="loginForm">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" id="lEmail" maxlength="50" required />
                        <input type="password" placeholder="Password" id="lPassword" maxlength="100" required />
                        <a href="../HTML/home.html">Continue as guest</a>
                        {/* <!-- Write it down next time --> */}
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" type="button" id="signIn">Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button class="ghost" type="button" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <Helmet>
                <script src=
                    "./loginBox.js" />
            </Helmet>
        </div>

    );
}

export default Login;