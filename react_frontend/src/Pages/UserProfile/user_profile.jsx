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