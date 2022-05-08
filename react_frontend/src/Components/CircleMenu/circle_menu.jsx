import { useEffect } from "react";


function Circle_Menu({ idStory }) {

    useEffect(() => {
        import('./circleMenu.css');
    })

    return (
        <nav className="myMenu">
            <input type="checkbox" href="#" className="myMenu-open" name="myMenu-open" id="myMenu-open" />
            <label className="myMenu-open-button" htmlFor="myMenu-open">
                <span className="lines line-1"></span>
                <span className="lines line-2"></span>
                <span className="lines line-3"></span>
            </label>

            <a href="#" className="myMenu-item purple" id="btnAdd" onClick={() => setDynamicParagraphs(1)}><i className="fa fa-plus"></i></a>
            <a href="postCreator" className="myMenu-item blue"><i className="fa fa-backward"></i></a>
            <a href="#" className="myMenu-item green" id="btnCreate" onClick={callAjax}><i className="fa fa-upload"></i></a>
            <a href="#" className="myMenu-item red" id="btnDelete"><i className="fa fa-trash"></i></a>

        </nav>
    );
}

export default Circle_Menu;