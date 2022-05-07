import React, {useEffect} from "react";
import $ from 'jquery';

export default function Sidebar() {
    const showHide = () =>{
        $('.sidebar').toggleClass("close");
    }
    const loadFile = () =>{
    }
    const body = document.querySelector('body'),
                sidebar = body.querySelector('nav'),
                toggle = body.querySelector(".toggle"),
                modeText = body.querySelector(".mode-text");

    const switchMode = () =>{
        body.classList.toggle("dark");
                        
        if(body.classList.contains("dark")){
            $(modeText).html("Light mode");
        }else{
            $(modeText).html("Dark mode");
                            
        }
    }
        
    useEffect(() => {
        import('./sidebar.css');
    })        

    return (
        <nav className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src="../IMAGES/logoLight.png" alt=""/>
                    </span>

                    <div className="text logo-text">
                        <span className="name">Folklore</span>
                        <span className="profession">Story creator</span>
                    </div>
                </div>
                <i className='bx bx-chevron-right toggle' onClick={showHide}></i>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box">
                        <i className='bx bx-pen icon'></i>
                        <input type="text" placeholder="Title..." maxLength="50" id="title"/>
                    </li>
                        <li className="search-box">
                                <i className='bx bx-text icon' ></i>
                                <textarea type="text" maxLength="500" id="summary" placeholder="Summary..."></textarea>
                        </li>

                        <li className="search-box">
                                <i className='bx bx-shield icon' ></i>
                                <span className="text nav-text lblWarning" id="lblWarning">Warnings</span>
                        </li>
                        <li className="choosers">
                            <select className="warnings" id="myMulti" ></select>
                        </li>

                        <li className="search-box">
                                <i className='bx bx-image icon' ></i>
                                <span className="text nav-text">Image</span>
                        </li>
                        <li className="choosers">
                            <input type="file" id="img" accept="image/*" onChange={loadFile}/>
                        </li>
                </div>
                <div id="imgHolder"></div>
                <div className="bottom-content">
                    <li className="">
                        <a href="../HTML/postCreator.html">
                            <i className='bx bx-log-out icon' ></i>
                            <span className="text nav-text">Exit</span>
                        </a>
                    </li>
                    <li className="mode">
                        <div className="sun-moon">
                            <i className='bx bx-moon icon moon'></i>
                            <i className='bx bx-sun icon sun'></i>
                        </div>
                        <span className="mode-text text">Dark mode</span>

                        <div className="toggle-switch" onClick={switchMode}>
                            <span className="switch"></span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
}