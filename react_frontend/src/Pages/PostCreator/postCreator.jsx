import React from "react";
import './postCreator.css';
import { Helmet } from "react-helmet";

function PostCreator() {
    return (
        <section>
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="shadow "></div>
                <a href="../HTML/blogCreator.html">
                    <div class="bowl1">
                        <h2>Blog</h2>
                        <div class="liquid1"></div>
                    </div>
                </a>
            </div>
            <div class="col-12 col-md-6">
                <div class="shadow"></div>
                <a href="../HTML/storyCreator.html">
                    <div class="bowl2">
                        <h2>Story</h2>
                        <div class="liquid2"></div>
                    </div>
                </a>
            </div>
        </div>
    </section>


    );
}

export default PostCreator;