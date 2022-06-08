import React from "react";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import EndPoints from "../../constants/endPoints";





function Navigation() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

    useEffect(() => {
        import('./navigation.css')
    }, [])

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const logOut = () => {
        fetch(EndPoints.getLogOutPoint, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    window.location.reload(false);

                    setIsLoggedIn(false)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }



    return (
        <div className="navigation">
            <nav id="mainNavbar" className="navbar navbar-dark navbar-expand-md px-5 py-0 fixed-top">
                <a href="#" className="navbar-brand">FOLKLORE</a>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-md-flex justify-content-between pb-3  pb-md-0" id="navLinks">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/" className="nav-link">HOME</a>
                        </li>
                        {isLoggedIn === "true" ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="*" id="dropdown04" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <span className="fa fa-user"></span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <a className="dropdown-item" href="/profile">My profile</a>
                                    <a className="dropdown-item" id="btnLogOut" onClick={(e) => logOut()}>Log out</a>
                                    <a className="dropdown-item" href="/library">Library</a>
                                    <a className="dropdown-item" href="/postCreator">Create post</a>
                                </div>
                            </li> :
                            <li className="nav-item">
                                <a href="/login" className="nav-link">SIGN IN</a>
                            </li>
                        }
                        <li className="nav-item">
                            <div className="dropdown">
                                <div id="google_translate_element"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;