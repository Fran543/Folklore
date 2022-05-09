import React, { useEffect, Suspense, useState } from "react";
import { Helmet } from "react-helmet";
import { Warning } from "../../Components"
import Select from 'react-select'
import AsyncSelect from 'react-select/async';


const o = []

export default function Sidebar() {

    var getWarningsEndPoint = "http://127.0.0.1:8091/getWarnings"
    const [warnings, setWarnings] = useState([])
    const [checkedWarning, setCheckedWarning] = useState([])
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [options, setOptions] = useState([])


    async function getWarnings() {
        await fetch(getWarningsEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setWarnings(result)
                    warnings.map(warning => {
                        o.push({ value: warning, label: warning.WarningName })
                        // setOptions(options => [...options, { value: warning, label: warning.WarningName }])
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        import('./sidebar.css');
        const fetchWarnings = async () => {
            await getWarnings()
        }
        fetchWarnings()
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    const addWarning = (event) => {
        // setCheckedWarning(checkedWarning => [...checkedWarning, event.target])
    }

    const removeWarning = (warning) => {
        // setCheckedWarning(checkedWarning.filter(name => name.includes()))
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
                        {/* <span className="text nav-text lblWarning" id="lblWarning">
                            Warnings
                        </span> */}
                        <Select placeholder="Warnings" options={o} isMulti className="ddlWarnings"> Warnings</Select>
                    </li>

                    <li className="search-box">
                        <i className='bx bx-image icon' ></i>
                        <span className="text nav-text">
                            <input type="file" id="img" accept="image/*" onChange={onSelectFile} />
                        </span>
                    </li>
                </div>
                {selectedFile && <div id="imgHolder" style={{ backgroundImage: `url(${preview})` }}></div>}
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
        </nav >
    );
}