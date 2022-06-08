import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserStories, UserInfo } from "../../Components";
import { Helmet } from "react-helmet";
import EndPoints from "../../constants/endPoints";

var getUserEndPoint = EndPoints.getUserEndPoint


function User_Profile() {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const asyncFetch = async () => {
        await fetch(getUserEndPoint, {
            credentials: 'include'
        })
            .then(async (response) => {
                var msg = await response.json();
                if (!response.ok) throw new Error(msg);
                else return msg;
            })
            .then(async (data) => {
                setUser(data)
            })
            .catch((error) => {
                localStorage.setItem("isLoggedIn", false)
                window.location.href = "/login"
            });
        setIsLoading(false)
    }


    useEffect(() => {
        import('./userProfile.css');

        asyncFetch()
    }, [])


    return (
        <>{isLoading ? "Loading..." :
            <div >
                <UserInfo user={user} />
                <UserStories user={user} />
            </div>
        }
            <Helmet>
                <script src="./particles.js"></script>
            </Helmet>
        </>
    );
}

export default User_Profile;