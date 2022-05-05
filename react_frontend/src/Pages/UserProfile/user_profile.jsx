import React from "react";
import './userProfile.css';

function User_Profile() {
    return (
        <div >
            <section className="first">
                <div className="col-md-6">
                    <h1 id="userName">Username</h1>
                    <div className="btnDelete">
                        <h3 id="email">email</h3>
                        <button id="btnDelete">
                            <h3>Delete</h3>
                        </button>
                    </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita eius, ipsam asperiores adipisci ut molestias
                        animi necessitatibus et totam consectetur rerum eligendi. Enim odit molestiae incidunt veniam iste repellendus
                        consectetur?
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita eius, ipsam asperiores adipisci ut molestias
                        animi necessitatibus et totam consectetur rerum eligendi. Enim odit molestiae incidunt veniam iste repellendus
                        consectetur?
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita eius, ipsam asperiores adipisci ut molestias
                        animi necessitatibus et totam consectetur rerum eligendi. Enim odit molestiae incidunt veniam iste repellendus
                        consectetur?
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita eius, ipsam asperiores adipisci ut molestias
                        animi necessitatibus et totam consectetur rerum eligendi. Enim odit molestiae incidunt veniam iste repellendus
                        consectetur?
                    </p>
                </div>
                <div className="imgPlaceholder col-md-6">
                    {/* <img src="../IMAGES/logoLight.png"> */}
                </div>
            </section>
        </div>
    );
}

export default User_Profile;