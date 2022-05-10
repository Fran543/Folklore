import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function Circle_Menu_Blog({ clearTextArea, upload }) {
  useEffect(() => {
    import("./circleMenu.css");
  });

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
      <a href="#" className="myMenu-item green" onClick={(e) => upload("qwe")}>
        <i className="fa fa-upload"></i>
      </a>
      <a
        href="#"
        className="myMenu-item red"
        id="btnDelete"
        onClick={(e) => clearTextArea()}
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
