import React from "react";
import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { LibraryStory } from "../../Components";
import EndPoints from "../../constants/endPoints";


var getUserLibraryEndPoint = EndPoints.getUserLibraryEndPoint
var removeStoryFromUserEndPoint = EndPoints.removeStoryFromUserEndPoint

function Library() {

    const [stories, setStores] = useState([])

    const fetchlibrary = async () => {
        await fetch(getUserLibraryEndPoint, {
            credentials: 'include',
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message;
            })
            .then(async (result) => {
                setStores(result)
            })
            .catch(error => {
                localStorage.setItem("isLoggedIn", false)
                window.location.href = "/login"
            })
    }

    const removeStory = (story) => {


        fetch(removeStoryFromUserEndPoint + "?storyID=" + story.IDStory, {
            credentials: 'include',
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message;
            })
            .then(async (result) => {
                console.log(result)
            })
            .catch(error => {
                localStorage.setItem("isLoggedIn", false)
                window.location.href = "/login"
            })
    }

    useEffect(() => {
        import('./library.css');
        fetchlibrary();
    }, [])

    return (
        <Carousel interval={null}>
            {stories.map((story, i) => (
                <Carousel.Item key={i}>
                    <LibraryStory removeStory={(story) => removeStory(story)} story={story} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Library;