import {
  Sidebar,
  CircleMenuBlog,
  BlogContent,
  DeleteAnimation,
} from "../../Components";
import { useState, useEffect } from "react";
import EndPoints from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { default as createNotification } from "../../Utils/createNotification";
import { validateBlog } from "../../Utils/validation";



var createStoryEndPoint = EndPoints.createStoryEndPoint


export default function BlogCreator() {
  const [cleared, setCleared] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
  const [bgColor, setBgColor] = useState("#f6f5ff");
  const [bgColorCanvas, setBgColorCanvas] = useState("white");

  const navigate = useNavigate();

  useEffect(() => {
    import('react-notifications/lib/notifications.css');
  }, [])

  async function callAjax(blogData) {
    if (validateBlog(title, summary, post)) {
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
    } else {
      setBgColor("#FAA0A0")
      setBgColorCanvas("#FAA0A0")
    }
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
        setImage={(title) => setImage(title)}
        bgColor={bgColor} />
      <CircleMenuBlog clearTextArea={(e) => setCleared(true)} upload={(e) => collectData(e)} />
      <BlogContent cleared={cleared}
        post={post}
        setPost={(title) => setPost(title)}
        bgColor={bgColorCanvas} />
      <DeleteAnimation />
    </>
  );
}
