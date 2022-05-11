import React from "react";
import { useEffect, useState } from "react";

var getStoryByIdEndPoint = "http://127.0.0.1:8091/getStoryById";

function PostFullScreen() {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        import("./postFullscreen.css");

        fetch(getStoryByIdEndPoint, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setStory(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <div>
            <div id="titleFlash">
                <h1>Title</h1>
            </div>

            <div className="effect"></div>

            <div id="hero">
                <div
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
                ></div>
                <div
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
                            <div className="col-sm-6">
                                <h1 id="title">Title</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6" id="postContainer"></div>
                        </div>
                        <div className="row" id="optionRow">
                            <div className="col-sm-6">
                                <p id="option1"></p>
                            </div>
                            <div className="col-sm-6">
                                <p id="option2"></p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PostFullScreen;