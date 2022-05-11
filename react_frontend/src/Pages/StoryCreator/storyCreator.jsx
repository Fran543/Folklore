import React from "react";
import { Sidebar, Canvas, DeleteAnimation } from "../../Components";
import { useState } from "react";

export default function StoryCreator() {

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [warnings, setWarnings] = useState([]);
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState("");

    const addPost = (post) => {
        console.log(post);
    }

    return (
        <>
            <div className="storyCreator">
                <Sidebar title={title}
                    setTitle={(title) => setTitle(title)}
                    summary={summary}
                    setSummary={(title) => setSummary(title)}
                    warnings={warnings}
                    setWarnings={(warnings) => setWarnings(warnings)}
                    image={image}
                    setImage={(title) => setImage(title)} />
                <Canvas addPost={(post) => addPost(post)} />
            </div>
            <DeleteAnimation />
        </>
    );
}