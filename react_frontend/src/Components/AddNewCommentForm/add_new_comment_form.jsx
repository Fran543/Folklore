import React from "react";
import { useEffect, useState } from "react";
import EndPoints from "../../constants/endPoints";

var addCommentToStory = EndPoints.addCommentToStory


function Add_New_Comment_Form({ idStory, createNotification }) {

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
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message.message;
            })
            .then(async (data) => {
                window.location.href = "/";
            })
            .catch(error => {
                localStorage.setItem("isLoggedIn", false)
                createNotification("error", error.message)
            })
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