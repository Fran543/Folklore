import {
  Sidebar,
  CircleMenuBlog,
  BlogContent,
  DeleteAnimation,
} from "../../Components";
import { useState } from "react";

var createStoryEndPoint = "http://127.0.0.1:8091/createStory";

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
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function BlogCreator() {
  const [cleared, setCleared] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");

  const collectData = async (e) => {
    console.log("Upload " + e)
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
