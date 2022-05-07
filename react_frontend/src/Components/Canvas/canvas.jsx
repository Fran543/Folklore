import React from "react";
import './canvas.css';
import $ from 'jquery';

export default function Canvas() {
    
    var numberOfOptions = 2;
    var counter = 1;
    var imgPlaceholder = 'imgHolder' + counter;
    const addParagraph = () => {
        $(".canvas").append(
            "<div class='movableParagraph'>"
            + "<div class='holder'>"
            + "<div id='imgHolder" + counter + "'></div>"
            + "<div class='paragraphImg'>"
            + "<input type='file' id='paragraphImg' accept='image/*' onchange='loadFile(event,\"" + imgPlaceholder + "\")'></input>"
            + "</div>"
            + "<div name='ddlHolder' class='ddlHolder'>"
            + "<select multiple='multiple' id='chooser" + counter + "' class='ddlChoices'>"
            + "</select>"
            + "</div>"
            + "<div class='storyPart' class='ui-widget-content'>"
            + "<textarea id='paragraph" + counter + "' class='paragraph'></textarea>"
            + "<hr>"
            + "<div class='options'>"
            + "<div class='number'>" + counter + "</div>"
            + "<textarea class='option' id='option" + counter + "'></textarea>"
            + "<div class='number'>" + (++counter) + "</div>"
            + "<textarea class='option' id='option" + counter + "'></textarea>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
        )
        counter++
        imgPlaceholder = 'imgHolder' + counter
        $(".movableParagraph").draggable({
            containment: 'body'
        });
    
        //$(".ddlChoices").empty()
        for (var i = 1; i <= numberOfOptions; i++) {
            $(".ddlChoices").append(
                "<option value='" + i + "'>" + i + "</option>"
            )
        }
        numberOfOptions += 2;
    }

    return (
        <section className="home">
        <div className="text">Canvas</div>
        <nav className="myMenu">
            <input type="checkbox" href="#" className="myMenu-open" name="myMenu-open" id="myMenu-open" />
            <label className="myMenu-open-button" htmlFor="myMenu-open">
                <span className="lines line-1"></span>
                <span className="lines line-2"></span>
                <span className="lines line-3"></span>
            </label>

            <a href="#" className="myMenu-item purple" id="btnAdd" onClick={addParagraph}><i className="fa fa-plus"></i></a>
            <a href="../HTML/postCreator.html" className="myMenu-item blue"><i className="fa fa-backward"></i></a>
            <a href="#" className="myMenu-item green" id="btnCreate"><i className="fa fa-upload"></i></a>
            <a href="#" className="myMenu-item red" id="btnDelete"><i className="fa fa-trash"></i></a>

        </nav>
        <div className="canvas"></div>
    </section>
    );
}