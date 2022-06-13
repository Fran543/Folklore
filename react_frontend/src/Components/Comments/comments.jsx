import { useEffect, useState } from "react";
import { default as AddNewCommentForm } from '../AddNewCommentForm/add_new_comment_form';
import { default as Comment } from '../Comment/comment';
import EndPoints from "../../constants/endPoints";


var getStoryCommentsEndPoint = EndPoints.getStoryCommentsEndPoint


function Comments({ idStory }) {

    const [comments, setComments] = useState([])


    useEffect(() => {
        import('./comments.css');
        fetch(getStoryCommentsEndPoint + "?idStory=" + idStory)
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

    return (
        <section className='mt-5 comments' data-testid="idStory" id={idStory}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <AddNewCommentForm idStory={idStory} />
                        <hr />
                        <p>Comments</p>
                        {comments.map((comment, i) => (
                            <Comment key={i} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Comments;