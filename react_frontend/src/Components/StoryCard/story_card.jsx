import { useState } from "react";
import { useEffect } from "react";
import { default as StarRating } from '../StarRating/star_rating';
import { default as Comments } from '../Comments/comments';

var getStoryCommentsEndPoint = "http://127.0.0.1:8091/getStoryComments"

function Story_Card({ story }) {

    const [starRatingToggle, setStarRatingToggle] = useState(false)
    const [commentsToggle, setCommentsToggle] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
        import('./storyCard.css');
        fetch(getStoryCommentsEndPoint + "?idStory=" + story.IDStory)
            .then(res => res.json())
            .then(
                (result) => {
                    setComments(result)
                    return result
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    const showPost = (id) => {
        alert(id);
    }

    return (
        <div className='card' key={story.IDStory} onDoubleClick={() => showPost(story.IDStory)}>
            <img className='card-img-top' src={story.ImageBlob} alt='Card image cap' />
            <div className='card-body'>
                <h5 className='card-title'> {story.StoryName}</h5>
                <p className='warnings'>
                </p>
                <p className='card-text'>{story.Summary}</p>
                <p className='card-text'>
                    <small className='text-muted'>
                        <i className='fas fa-star star' onClick={() => setStarRatingToggle(starRatingToggle ? false : true)}></i>{story.Score ? story.Score : 0}
                        <i className='far fa-user'></i>{story.Username}
                        <i className='fas fa-calendar-alt'></i>{new Date(story.PubDate).toDateString()}
                        <i className='fas fa-comment comment' onClick={() => setCommentsToggle(commentsToggle ? false : true)}></i> {comments.length} comments
                    </small>
                </p>
                {starRatingToggle && <StarRating idStory={story.IDStory} />}
                {commentsToggle && <Comments idStory={story.IDStory} comments={comments} />}


            </div>
        </div>
    );
}

export default Story_Card;