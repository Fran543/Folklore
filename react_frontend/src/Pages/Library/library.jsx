import React from "react";
import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { LibraryStory } from "../../Components";

var getUserLibraryEndPoint = "http://127.0.0.1:8091/getUserLibrary"


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

    useEffect(() => {
        import('./library.css');
        fetchlibrary();
    })

    return (
        <Carousel>
            {stories.map((story, i) => (
                <Carousel.Item key={i}>
                    <LibraryStory story={story} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Library;