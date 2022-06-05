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
            .then(res => res.json())
            .then(
                (result) => {
                    setStores(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }

    const removeStory = (story) => {

        const check_cookie_name = (name) => {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) {
                console.log(match[2]);
            }
            else {
                console.log('--something went wrong---');
            }
        }
        check_cookie_name("jwt")
        console.log(story)
        fetch(removeStoryFromUserEndPoint + "?storyID=" + story.IDStory, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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
        import('./library.css');
        fetchlibrary();
    })

    return (
        <Carousel>
            {stories.map((story, i) => (
                <Carousel.Item key={i}>
                    <LibraryStory removeStory={(story) => removeStory(story)} story={story} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Library;