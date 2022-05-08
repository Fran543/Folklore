import { useState } from "react";
import { useEffect } from "react";


function Library_Story() {

    useEffect(() => {
        import('./libraryStory.css');
    })

    return (
        <div className="story_card" id="cardGlow">
            <div className="info_section">
                <div className="row">
                    <div className="col-12 d-md-none">
                        <img src="../IMAGES/storiesPlaceholder.avif" alt="image" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6 text-start">
                        <h1 id="lbTitle">Story Name</h1>
                        <div className="warnings">
                            <span>Warning</span>
                            <span> | </span>
                            <span>Warning</span>
                            <span> | </span>
                            <span>Warning</span>
                            <span> | </span>
                            <span>Warning</span>
                        </div>
                    </div>
                </div>
                <div className="story_desc">
                    <p className="text">
                        Set in a world where fantasy creatures live side by side with humans. A human cop is
                        forced to
                        work with an Orc to find a weapon everyone is prepared to kill for.
                    </p>
                </div>
                <div className="story_social">
                    <button className="btns first">
                        <i className="material-icons-outlined"> play_arrow</i>
                        <p>Read</p>
                    </button>
                    <button className="btns second">
                        <i className="material-icons-outlined">remove</i>
                        <p>Remove</p>
                    </button>
                </div>
            </div>
            <div className="blur_back card_back"></div>
        </div>
    );
}

export default Library_Story;