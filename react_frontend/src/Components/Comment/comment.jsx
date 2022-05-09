import { useEffect } from "react";


function Comment({ comment }) {

    useEffect(() => {
        import('./comment.css');
    })

    return (
        <div className='media'>
            <h4>{comment.Username}</h4>
            <p>{comment.Content}</p>
        </div>
    );
}

export default Comment;