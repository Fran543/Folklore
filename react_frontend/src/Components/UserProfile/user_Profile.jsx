import React from "react";
import "./user_profile.css";
import { default as Button } from './Button'

var getUserProfileEndPoint = "http://127.0.0.1:8091/getUserProfile";

function UserProfile() {
  return (
    <div>
      <section className="first">
        <div className="col-md-6">
          <h1 id="userName">Username</h1>
          <div className="btnDelete">
            <h3 id="email">email</h3>
            <Button />
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            eius, ipsam asperiores adipisci ut molestias animi necessitatibus et
            totam consectetur rerum eligendi. Enim odit molestiae incidunt
            veniam iste repellendus consectetur? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Expedita eius, ipsam asperiores
            adipisci ut molestias animi necessitatibus et totam consectetur
            rerum eligendi. Enim odit molestiae incidunt veniam iste repellendus
            consectetur? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Expedita eius, ipsam asperiores adipisci ut molestias animi
            necessitatibus et totam consectetur rerum eligendi. Enim odit
            molestiae incidunt veniam iste repellendus consectetur? Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Expedita eius, ipsam
            asperiores adipisci ut molestias animi necessitatibus et totam
            consectetur rerum eligendi. Enim odit molestiae incidunt veniam iste
            repellendus consectetur?
          </p>
        </div>
        <div className="imgPlaceholder col-md-6">
          {/* <img src="../IMAGES/logoLight.png"> */}
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
