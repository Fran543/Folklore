import {
  Sidebar,
  CircleMenuBlog,
  BlogContent,
  DeleteAnimation,
} from "../../Components";
import { useState } from "react";
import EndPoints from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';


var createStoryEndPoint = EndPoints.createStoryEndPoint


export default function BlogCreator() {
  const [cleared, setCleared] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
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
        let message = await response.json()
        if (!response.ok) throw new Error(message.message);
        else return message.message;
      })
      .then(async (data) => {
        console.log(data)
        window.location.href = "/"
      })
      .catch(error => {
        alert(error)
        localStorage.setItem("isLoggedIn", false)
        window.location.href = "/login"
      })
  }


  const collectData = async (e) => {

    e.preventDefault();
    await callAjax({
      title: title,
      summary: summary,
      image: image,
      posts: [{ content: post }],
      warnings: warnings
    });
  };

  return (
    <>
      <Sidebar title={title}
        setTitle={(title) => setTitle(title)}
        summary={summary}
        setSummary={(title) => setSummary(title)}
        warnings={warnings}
        setWarnings={(warnings) => setWarnings(warnings)}
        image={image}
        setImage={(title) => setImage(title)} />
      <CircleMenuBlog clearTextArea={(e) => setCleared(true)} upload={(e) => collectData(e)} />
      <BlogContent cleared={cleared}
        post={post}
        setPost={(title) => setPost(title)} />
      <DeleteAnimation />
    </>
  );
}
