import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserStories, UserInfo } from "../../Components";
import { Helmet } from "react-helmet";

var getUserEndPoint = "http://127.0.0.1:8091/getUser"


function User_Profile() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        import('./userProfile.css');

        fetch(getUserEndPoint, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setUser(result)
                    return result
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    return (
        <div >
            <UserInfo user={user} />
            <UserStories user={user} />
            <Helmet>
                <script src=
                    ".\particles.js" />
            </Helmet>
        </div>

    );
}

export default User_Profile;