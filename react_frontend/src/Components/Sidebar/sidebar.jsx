import React, { useEffect, Suspense, useState } from "react";
import { Helmet } from "react-helmet";
import { Warning } from "../../Components"

export default function Sidebar() {

    var getWarningsEndPoint = "http://127.0.0.1:8091/getWarnings"
    const [warnings, setWarnings] = useState([])

    function getWarnings() {
        fetch(getWarningsEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setWarnings(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        import('./sidebar.css');
        getWarnings()
    }, [])

    const [checkedWarning, setCheckedWarning] = useState([])

    const addWarning = (event) => {
        console.log(event.target)
        // checkedWarning.push(event.target.value)
        setCheckedWarning(checkedWarning => [...checkedWarning, event.target.value])
    }

    return (
        <nav className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src="../IMAGES/logoLight.png" alt="" />
                    </span>

                    <div className="text logo-text">
                        <span className="name">Folklore</span>
                        <span className="profession">Story creator</span>
                    </div>
                </div>
                <i className='bx bx-chevron-right toggle'></i>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box">
                        <i className='bx bx-pen icon'></i>
                        <input type="text" placeholder="Title..." maxLength="50" id="title" />
                    </li>
                    <li className="search-box">
                        <i className='bx bx-text icon' ></i>
                        <textarea type="text" maxLength="500" id="summary" placeholder="Summary..."></textarea>
                    </li>

                    <li className="search-box">
                        <i className='bx bx-shield icon' ></i>
                        <span className="text nav-text lblWarning" id="lblWarning">
                            Warnings
                            {checkedWarning.map((warning, i) => (
                                <Suspense key={i} fallback={<div >Loading Component....</div>}>
                                    <Warning parentToChild={warning} />
                                </Suspense>
                            ))}
                        </span>
                    </li>
                    <li className="choosers">
                        <select className="warnings" id="myMulti" onChange={addWarning}>
                            {warnings.map(warning => (
                                <option key={warning.IDWarning}>{warning.WarningName}</option>
                            ))}
                        </select>
                    </li>

                    <li className="search-box">
                        <i className='bx bx-image icon' ></i>
                        <span className="text nav-text">Image</span>
                    </li>
                    <li className="choosers">
                        <input type="file" id="img" accept="image/*" />
                    </li>
                </div>
                <div id="imgHolder"></div>
                <div className="bottom-content">
                    <li className="">
                        <a href="/postCreator">
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

                        <div className="toggle-switch">
                            <span className="switch"></span>
                        </div>
                    </li>
                </div>
            </div>

            <Helmet>
                <script src="sidebar.js"></script>
            </Helmet>
        </nav>
    );
}