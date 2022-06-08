import { useEffect, useState } from "react";
import EndPoints from "../../constants/endPoints";
import { default as createNotification } from "../../Utils/createNotification";



var addScoreToStory = EndPoints.addScoreToStory
var getUserStoryScore = EndPoints.getUserStoryScore

function Star_Rating({ idStory, createNotification }) {

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
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message;
            })
            .then(async (result) => {
                setScore(result.score)
                setOrgScore(result.score)
            })
            .catch(error => {
            })
    }, [])

    const sendScore = (score) => {
        fetch(addScoreToStory, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: score, idStory: orgIdStory })
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message;
            })
            .then(async (result) => {
                console.log(result)
                window.location.reload(false);
            })
            .catch(error => {
                localStorage.setItem("isLoggedIn", false)
                createNotification("error", error.message)
                // window.location.href = "/login"
            })
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