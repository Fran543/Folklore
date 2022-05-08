import { useEffect } from "react";


function Comment({ idStory }) {

    useEffect(() => {
        import('./comment.css');
    })

    return (
        <div className='media'>
            <h4>John Doe</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    );
}

export default Comment;