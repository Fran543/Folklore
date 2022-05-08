import React from "react";
import { useEffect } from "react";
// import { Helmet } from "react-helmet";

function PostCreator() {

    useEffect(() => {
        import('./postCreator.css');
    })

    return (
        <section>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="shadow "></div>
                    <a href="../HTML/blogCreator.html">
                        <div className="bowl1">
                            <h2>Blog</h2>
                            <div className="liquid1"></div>
                        </div>
                    </a>
                </div>
                <div className="col-12 col-md-6">
                    <div className="shadow"></div>
                    <a href="../HTML/storyCreator.html">
                        <div className="bowl2">
                            <h2>Story</h2>
                            <div className="liquid2"></div>
                        </div>
                    </a>
                </div>
            </div>
        </section>


    );
}

export default PostCreator;