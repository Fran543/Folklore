import { useEffect } from "react";


function Star_Rating({ idStory }) {

    useEffect(() => {
        import('./starRating.css');
    })

    return (
        <div className='star-rating' id={idStory}>
            <input id='star-5' type='radio' name='rating' value='star-5' />
            <label htmlFor='star-5' title='5 stars'>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-4' type='radio' name='rating' value='star-4' />
            <label htmlFor='star-4' title='4 stars'>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-3' type='radio' name='rating' value='star-3' />
            <label htmlFor='star-3' title='3 stars'>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-2' type='radio' name='rating' value='star-2' />
            <label htmlFor='star-2' title='2 stars'>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
            <input id='star-1' type='radio' name='rating' value='star-1' />
            <label htmlFor='star-1' title='1 star'>
                <i className='active fa fa-star' aria-hidden='true'></i>
            </label>
        </div>
    );
}

export default Star_Rating;