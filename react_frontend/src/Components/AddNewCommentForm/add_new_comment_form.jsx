import { useEffect, useState } from "react";

var addCommentToStory = "http://127.0.0.1:8091/addCommentToStory"


function Add_New_Comment_Form({ idStory }) {

    const [comment, setComment] = useState("")


    useEffect(() => {
        import('./addNewCommentForm.css');
    })

    const changeComment = (comment) => {
        setComment(comment);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(addCommentToStory, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: comment, idStory: idStory })
        })
            .then(res => res.json())
            .then(
                (result) => {
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
        <form onSubmit={e => { handleSubmit(e) }}>
            <p className='pull-left'>Add new Comment</p>
            <textarea className='form-control' id='message' placeholder='Your message...' required='' maxLength='250' value={comment} onChange={(e) => changeComment(e.target.value)} ></textarea>
            <button type='submit' className='btn btn-normal btnSubmit'>Submit</button>
        </form>
    );
}

export default Add_New_Comment_Form;