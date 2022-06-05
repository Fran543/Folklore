import React, { useEffect, Suspense, useState, useLayoutEffect } from "react";
import { Helmet } from "react-helmet";
import { Warning } from "../../Components"
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import EndPoints from "../../constants/endPoints";

const getWarningsEndPoint = EndPoints.getWarningsEndPoint

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export default function Sidebar({ title, setTitle, summary, setSummary, setWarnings, setImage }) {


    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [options, setoptions] = useState([])

    // useEffect(() => {
    //     getWarnings()
    // }, [])
    useEffect(() => {
        getWarnings()
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    useLayoutEffect(() => {
        import('./sidebar.css');
    })

    async function getWarnings() {
        var o = []

        await fetch(getWarningsEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    for (const warning of result) {
                        o.push({ value: warning, label: warning.WarningName })
                    }
                    setoptions(o);
                },
                (error) => {
                    console.log(error)
                }
            )
    }




    const onSelectFile = async e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0])
        setImage(await toBase64(e.target.files[0]))
    }

    const handleChange = (selectedOption) => {
        let values = Array.from(
            selectedOption,
            (option) => option.value.IDWarning
        );
        setWarnings(values)
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
                        <input type="text" placeholder="Title..." maxLength="50" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </li>
                    <li className="search-box">
                        <i className='bx bx-text icon' ></i>
                        <textarea type="text" maxLength="500" id="summary" placeholder="Summary..." value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>
                    </li>

                    <li className="search-box">
                        <i className='bx bx-shield icon' ></i>
                        {/* <span className="text nav-text lblWarning" id="lblWarning">
                            Warnings
                        </span> */}
                        <Select placeholder="Warnings"
                            options={options}
                            isMulti
                            className="ddlWarnings"
                            onChange={handleChange}
                        > Warnings</Select>
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