import { useState } from "react";
import { useEffect } from "react";
import { default as StarRating } from '../StarRating/star_rating';
import { default as Comments } from '../Comments/comments';
import { useNavigate } from 'react-router-dom';
import EndPoints from "../../constants/endPoints";


const addStoryToUserLibraryEndPoint = EndPoints.addStoryToUserLibraryEndPoint

function Story_Card({ story }) {

    const [starRatingToggle, setStarRatingToggle] = useState(false)
    const [commentsToggle, setCommentsToggle] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        import('./storyCard.css');

    }, [])

    const showPost = (e) => {
        navigate("/postFullscreen/" + story.IDStory)
    }

    const addToLibrary = (idStory) => {
        console.log(idStory)
        fetch(addStoryToUserLibraryEndPoint + "?storyID=" + idStory, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    alert(result.message)
                },
                (error) => {
                    alert(error.message)
                }
            )
    }

    return (
        <div className='card' key={story.IDStory} onDoubleClick={(e) => showPost(e)}>
            <img className='card-img-top' src={story.ImageBlob} alt='Card image cap' />
            <div className='card-body'>
                <h5 className='card-title'> {story.StoryName}</h5>
                {story.warnings.length !== 0 && <h6>Warnings:</h6>}
                <p className='warnings'>
                    {story.warnings.map((warning, i) => (
                        <span key={i}>{warning.WarningName} | </span>
                    ))}
                </p>
                <p className='card-text'>{story.Summary}</p>
                <p className='card-text'>
                    <small className='text-muted'>
                        <i className='fas fa-star star' onClick={() => setStarRatingToggle(starRatingToggle ? false : true)}></i>{story.Score ? story.Score : 0}
                        <i className='far fa-user'></i>{story.Username}
                        <i className='fas fa-calendar-alt'></i>{new Date(story.PubDate).toDateString()}
                        <i className='fas fa-comment comment' onClick={() => setCommentsToggle(commentsToggle ? false : true)}></i> {story.CommentNbr} comments
                        <i className='fas fa-book book' data-toggle="tooltip" data-placement="top" title="Add to library" style={{ color: "darkmagenta" }} onClick={() => addToLibrary(story.IDStory)}></i>
                    </small>
                </p>
                {starRatingToggle && <StarRating idStory={story.IDStory} />}
                {commentsToggle && <Comments idStory={story.IDStory} />}


            </div>
        </div >
    );
}

export default Story_Card;