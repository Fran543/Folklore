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
        window.location.href = "/postFullscreen/" + story.IDStory
    }


    return (
        <div className="story_card" id="cardGlow">
            <div className="info_section blur_back card_back" style={{ backgroundImage: `url(${story.ImageBlob})` }}>
                <div className="row">
                    {/* <div className="col-12 d-md-none">
                        <img src={story.ImageBlob} alt="image" className="img-fluid" />
                    </div> */}
                    <div className="col-10 text-start nameContainer">
                        <h1 className="glass" id="lbTitle">{story.StoryName}</h1>
                    </div>
                    {story.warnings.length !== 0 &&
                        <div className="col-10 text-start glass warningContainer">
                            <h6>Warnings:</h6>
                            <p className='warnings'>
                                {story.warnings.map((warning, i) => (
                                    <>
                                        <span>{warning.WarningName} </span>
                                        <span> | </span>
                                    </>
                                ))}
                            </p>
                        </div>
                    }
                    <div className="col-10 col-md-6 glass story_desc">
                        <p className="text">
                            {story.Summary}
                        </p>
                        <p className='card-text'>
                            <small className='text-muted'>
                                <i className='fas fa-star star'></i>{story.Score ? story.Score : 0}
                                <i className='far fa-user'></i>{story.Username}
                                <i className='fas fa-calendar-alt'></i>{new Date(story.PubDate).toDateString()}
                            </small>
                        </p>
                    </div>
                </div>
                <div className="story_social">
                    <button className="btns first glass" onClick={(e) => showPost(e)}>
                        <i className="material-icons-outlined"> play_arrow</i>
                        <p>Read</p>
                    </button>
                    <button className="btns second glass" onClick={() => { removeStory(story) }}>
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