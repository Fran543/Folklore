import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import logo from '../../Assets/IMAGES/storiesPlaceholder.avif';



function Library_Story({ story, removeStory }) {
    
    const navigate = useNavigate();

    useEffect(() => {
        import('./libraryStory.css');
    })

    const showPost = (e) => {
        navigate("/postFullscreen/" + story.IDStory)
    }


    return (
        <div className="story_card" id="cardGlow">
            <div className="info_section blur_back card_back" style={{ backgroundImage: `url(${story.ImageBlob})` }}>
                <div className="row">
                    {/* <div className="col-12 d-md-none">
                        <img src={story.ImageBlob} alt="image" className="img-fluid" />
                    </div> */}
                    <div className="col-12 col-md-6 text-start">
                        <h1 id="lbTitle">{story.StoryName}</h1>
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
                        {story.Summary}
                    </p>
                </div>
                <div className="story_social">
                    <button className="btns first" onClick={(e) => showPost(e)}>
                        <i className="material-icons-outlined"> play_arrow</i>
                        <p>Read</p>
                    </button>
                    <button className="btns second" onClick={() => { removeStory(story) }}>
                        <i className="material-icons-outlined">remove</i>
                        <p>Remove</p>
                    </button>
                </div>
            </div>
            <div className="blur_back card_back" style={{ backgroundImage: `url(${story.ImageBlob})` }}></div>
        </div >
    );
}

export default Library_Story;