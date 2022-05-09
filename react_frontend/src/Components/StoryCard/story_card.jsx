import { useState } from "react";
import { useEffect } from "react";
import { default as StarRating } from '../StarRating/star_rating';
import { default as Comments } from '../Comments/comments';


function Story_Card({ story }) {

    const [starRatingToggle, setStarRatingToggle] = useState(false)
    const [commentsToggle, setCommentsToggle] = useState(false)

    useEffect(() => {
        import('./storyCard.css');

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
                        <i className='fas fa-comment comment' onClick={() => setCommentsToggle(commentsToggle ? false : true)}></i> {story.CommentNbr} comments
                    </small>
                </p>
                {starRatingToggle && <StarRating idStory={story.IDStory} />}
                {commentsToggle && <Comments idStory={story.IDStory} />}


            </div>
        </div>
    );
}

export default Story_Card;