import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import EndPoints from "../../constants/endPoints";

var getStoryByIdEndPoint = EndPoints.getStoryByIdEndPoint
var getPostByChoiceIdEndPoint = EndPoints.getPostByChoiceIdEndPoint

function PostFullScreen() {
  const [story, setStory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [choices, setChoices] = useState(null);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const asyncFetch = async () => {
    await fetch(getStoryByIdEndPoint + "?idStory=" + id, {
      credentials: "include",

    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setStory(result.story);
          setPosts(posts => [...posts, result.firstPost]);
          if (result.choices.length !== 0) setChoices(result.choices)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }

  const fetchNextPost = async (choiceID) => {
    await fetch(getPostByChoiceIdEndPoint + "?idChoice=" + choiceID, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.post) {
            console.log(result)
            setPosts(posts => [...posts, result.post]);
            setChoices(result.choices)
          } else {
            setChoices(null)
          }

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }


  useEffect(() => {
    import("./postFullscreen.css");
    asyncFetch();

  }, []);

  return (
    <div>
      {/* <div id="titleFlash">
        <h1></h1>
      </div> */}

      {/* <div className="effect"></div> */}

      <div id="hero">
        {/* <div
          className="layer-bg layer"
          data-type="parallax"
          data-depth="0.10"
        ></div>
        <div
          className="layer-1 layer"
          data-type="parallax"
          data-depth="0.20"
        ></div>
        <div
          className="layer-2 layer"
          data-type="parallax"
          data-depth="0.50"
        ></div> */}
        <div
          style={{ backgroundImage: story && `url(${story.ImageBlob})`, backgroundPosition: "center", backgroundSize: "cover" }}
          className="layer-3 layer"
          data-type="parallax"
          data-depth="0.80"
        ></div>
        <div
          className="layer-overlay layer"
          data-type="parallax"
          data-depth="0.85"
        ></div>
        <div
          className="layer-4 layer"
          data-type="parallax"
          data-depth="1.00"
        ></div>
      </div>
      <div id="hero-mobile"></div>
      <div id="content">
        <div className="container">
          <section className="first-section">
            <div className="row">
              <div className="col-sm-12 text-center ">
                <h1 id="title">{story && story.StoryName}</h1>
              </div>
            </div>
            {posts.map((post, i) => (
              <div className="row" key={i}>
                {post.ImageBlob ? <>
                  <div className="col-sm-6 " id="postContainer">{post.Content}</div>
                  <div className="col-sm-6 "><img src={post.ImageBlob && post.ImageBlob} /></div>
                </> :
                  <div className="col-sm-12 " id="postContainer">{post.Content}</div>
                }
              </div>

            ))}
            <div className="row" id="optionRow">
              {choices !== null ?
                <>
                  <div className="col-sm-6 text-center choice" onClick={() => fetchNextPost(choices[0].IDChoice)}>
                    <p id="option1">{choices && choices[0].Content}</p>
                  </div>
                  <div className="col-sm-6 text-center choice" onClick={() => fetchNextPost(choices[1].IDChoice)}>
                    <p id="option2">{choices && choices[1].Content}</p>
                  </div>
                </> :
                <div className="col-sm-12 text-center">
                  <h5 >THE END</h5>
                </div>
              }
            </div>
            <div className="row" id="optionRow">
              <div className="col-sm-3 text-center">
                <a href="/" className="nav-link">HOME</a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Helmet>
        <script src="./postFullscreen.js" />
      </Helmet>
    </div >
  );
}

export default PostFullScreen;
