import React from "react";
import { useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { LibraryStory } from "../../Components";


function Library() {

    useEffect(() => {
        import('./library.css');
    })

    return (
        <Carousel>
            <Carousel.Item>
                <LibraryStory />
            </Carousel.Item>
            <Carousel.Item>
                <LibraryStory />
            </Carousel.Item>
            <Carousel.Item>
                <LibraryStory />
            </Carousel.Item>
        </Carousel>
    );
}

export default Library;