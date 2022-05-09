import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

var createStoryEndPoint = "http://127.0.0.1:8091/createStory";
async function callAjax(blogData) {
  fetch(createStoryEndPoint, {
    method: "POST",
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

function Circle_Menu_Blog({ clearTextArea }) {
  useEffect(() => {
    import("./circleMenu.css");
  });

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const collectData = async (e) => {
    await callAjax({
      title,
      summary,
      warnings,
      image,
      content
    });
  };

  return (
    <nav className="myMenu">
      <input
        type="checkbox"
        href="#"
        className="myMenu-open"
        name="myMenu-open"
        id="myMenu-open"
      />
      <label className="myMenu-open-button" htmlFor="myMenu-open">
        <span className="lines line-1"></span>
        <span className="lines line-2"></span>
        <span className="lines line-3"></span>
      </label>

      <a href="postCreator" className="myMenu-item purple">
        <i className="fa fa-backward"></i>
      </a>
      <a href="#" className="myMenu-item green" onClick={collectData}>
        <i className="fa fa-upload"></i>
      </a>
      <a
        href="#"
        className="myMenu-item red"
        id="btnDelete"
        onClick={clearTextArea()}
      >
        <i className="fa fa-trash"></i>
      </a>

      <Helmet>
        <script src="./storyCreator.js"></script>
      </Helmet>
    </nav>
  );
}

export default Circle_Menu_Blog;
