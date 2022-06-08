import React from "react";
import { Sidebar, Canvas, DeleteAnimation } from "../../Components";
import { useState } from "react";
import EndPoints from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';



var createStoryEndPoint = EndPoints.createStoryEndPoint

export default function StoryCreator() {

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [warnings, setWarnings] = useState([]);
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);
    const [paragraphNbr, setParagraphNbr] = useState(0);
    const navigate = useNavigate();



    async function callAjax(blogData) {
        fetch(createStoryEndPoint, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
        })
            .then(async (response) => {
                var msg = await response.text();
                if (!response.ok) throw new Error(msg);
                else return msg;
            })
            .then(async (data) => {
                console.log(data);
                window.location.href = "/"

            })
            .catch((error) => {
                alert(error)
                localStorage.setItem("isLoggedIn", false)
                window.location.href = "/login"
            });

    }

    const collectData = async () => {
        console.log("Upload ")
        await callAjax({
            title: title,
            summary: summary,
            image: image,
            posts: posts,
            warnings: warnings
        });
    };



    const addPost = () => {
        setPosts(posts => [...posts, {
            content: "",
            imageBlob: "",
            conditions: [],
            choices: [{ choiceValue: "" }, { choiceValue: "" }]
        }])
        setParagraphNbr(paragraphNbr + 1);
    }
    const clearPosts = () => {
        setPosts([{}])
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
                <Canvas posts={posts} paragraphNbr={paragraphNbr} addPost={() => addPost()} uploadStory={() => collectData()} clearPosts={() => clearPosts()} />
            </div>
            <DeleteAnimation />
        </>
    );
}