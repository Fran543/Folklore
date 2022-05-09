import { useEffect, useState } from "react";

var addScoreToStory = "http://127.0.0.1:8091/addScoreToStory"
var getUserStoryScore = "http://127.0.0.1:8091/getUserStoryScore"

function Star_Rating({ idStory }) {

    const [score, setScore] = useState(0)
    const [orgScore, setOrgScore] = useState(0)
    const [orgIdStory, setOrgIdStory] = useState(0)


    useEffect(() => {
        import('./starRating.css');
        setOrgIdStory(idStory);
        fetch(getUserStoryScore, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idStory: idStory })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setScore(result.score)
                    setOrgScore(result.score)
                    console.log(result.score)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    const sendScore = (score) => {
        fetch(addScoreToStory, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: score, idStory: orgIdStory })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    window.location.reload(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <div className='star-rating' id={idStory} onMouseLeave={(e) => setScore(orgScore)}>
            <input id='star-5' type='radio' name='rating' value='5' onClick={(e) => { sendScore(e.target.value) }} />
            <label htmlFor='star-5' title='5 stars' style={{ color: score > 4 && '#000000' }} onMouseEnter={(e) => setScore(5)}>
                <i className='active fa fa-star' aria-hidden='true' ></i>
            </label>
            <input id='star-4' type='radio' name='rating' value='4' onClick={(e) => { sendScore(e.target.value) }} />
            <label htmlFor='star-4' title='4 stars' style={{ color: (score > 3) && '#000000' }} onMouseEnter={(e) => setScore(4)} >
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-3' type='radio' name='rating' value='3' onClick={(e) => { sendScore(e.target.value) }} />
            <label htmlFor='star-3' title='3 stars' style={{ color: (score > 2) && '#000000' }} onMouseEnter={(e) => setScore(3)}>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-2' type='radio' name='rating' value='2' onClick={(e) => { sendScore(e.target.value) }} />
            <label htmlFor='star-2' title='2 stars' style={{ color: (score > 1) && '#000000' }} onMouseEnter={(e) => setScore(2)}>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-1' type='radio' name='rating' value='1' onClick={(e) => { sendScore(e.target.value) }} />
            <label htmlFor='star-1' title='1 star' style={{ color: (score > 0) && '#000000' }} onMouseEnter={(e) => setScore(1)}>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
        </div>
    );
}

export default Star_Rating;