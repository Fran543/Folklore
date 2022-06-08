import React from "react";
import { Sidebar, Canvas, DeleteAnimation } from "../../Components";
import { useState, useEffect } from "react";
import EndPoints from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { default as createNotification } from "../../Utils/createNotification";
import { validateStory } from "../../Utils/validation";




var createStoryEndPoint = EndPoints.createStoryEndPoint

export default function StoryCreator() {

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [warnings, setWarnings] = useState([]);
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);
    const [paragraphNbr, setParagraphNbr] = useState(0);
    const [bgColor, setBgColor] = useState("#f6f5ff");
    const [bgColorCanvas, setBgColorCanvas] = useState("white");
    const navigate = useNavigate();

    useEffect(() => {
        import('react-notifications/lib/notifications.css');
    }, [])



    async function callAjax(blogData) {
        if (validateStory(title, summary, posts)) {
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
        } else {
            if (posts.length === 0) {
                createNotification('error', "Story must have at least one post!")
            }
            setBgColor("#FAA0A0")
            setBgColorCanvas("#FAA0A0")
        }


    }

    const collectData = async () => {
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
                    setImage={(title) => setImage(title)}
                    bgColor={bgColor} />
                <Canvas posts={posts} bgColor={bgColorCanvas} paragraphNbr={paragraphNbr} addPost={() => addPost()} uploadStory={() => collectData()} clearPosts={() => clearPosts()} />
            </div>
            <DeleteAnimation />
            <NotificationContainer />
        </>
    );
}