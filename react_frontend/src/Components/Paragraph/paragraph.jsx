import React from react;
import './paragraph.css';
import $ from 'jquery';

export default function Paragraph() {

    return (
        <div className='movableParagraph'>
            + <div className='holder'>
            + <div id='imgHolder + counter + '></div>
            + <div className='paragraphImg'>
            + <input type='file' id='paragraphImg' accept='image/*' onchange='loadFile(event,\ + imgPlaceholder + \)'></input>
            + </div>
            + <div name='ddlHolder' className='ddlHolder'>
            + <select multiple='multiple' id='chooser + counter + ' className='ddlChoices'>
            + </select>
            + </div>
            + <div className='storyPart ui-widget-content'>
            + <textarea id='paragraph + counter + ' className='paragraph'></textarea>
            + <hr/>
            + <div className='options'>
            + <div className='number'> + counter + </div>
            + <textarea className='option' id='option + counter + '></textarea>
            + <div className='number'> + (++counter) + </div>
            + <textarea className='option' id='option + counter + '></textarea>
            + </div>
            + </div>
            + </div>
            + </div>
    );
}