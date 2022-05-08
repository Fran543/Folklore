import { useEffect } from "react";


function Add_New_Comment_Form({ idStory }) {

    useEffect(() => {
        import('./addNewCommentForm.css');
    })

    return (
        <form>
            <p className='pull-left'>Add new Comment</p>
            <textarea className='form-control' id='message' placeholder='Your message...' required='' maxLength='250'></textarea>
            <button type='submit' className='btn btn-normal btnSubmit'>Submit</button>
        </form>
    );
}

export default Add_New_Comment_Form;