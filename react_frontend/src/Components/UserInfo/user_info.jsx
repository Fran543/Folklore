import { useEffect } from "react";
import { default as Button } from "./Button";

function User_Info({ user }) {
  useEffect(() => {
    import("./userInfo.css");
  });


  return (
    <section id="bg" className="first">
      <div className="col-md-6">
        <h1 id="userName">{user && user.username}</h1>
        <div className="btnDelete">
          <h3 id="email">{user && user.email}</h3>
          <Button />
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
          eius, ipsam asperiores adipisci ut molestias animi necessitatibus et
          totam consectetur rerum eligendi. Enim odit molestiae incidunt veniam
          iste repellendus consectetur? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Expedita eius, ipsam asperiores adipisci ut
          molestias animi necessitatibus et totam consectetur rerum eligendi.
          Enim odit molestiae incidunt veniam iste repellendus consectetur?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
          eius, ipsam asperiores adipisci ut molestias animi necessitatibus et
          totam consectetur rerum eligendi. Enim odit molestiae incidunt veniam
          iste repellendus consectetur? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Expedita eius, ipsam asperiores adipisci ut
          molestias animi necessitatibus et totam consectetur rerum eligendi.
          Enim odit molestiae incidunt veniam iste repellendus consectetur?
        </p>
      </div>
    </section>
  );
}

export default User_Info;
