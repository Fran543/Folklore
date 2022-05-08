import { Helmet } from "react-helmet";

export default function Paragraph() {
  return (
    <div className="movableParagraph">
      <div className="holder">
        <div id="imgHolder + counter + "></div>
        <div className="paragraphImg">
          <input type="file" id="paragraphImg" accept="image/*"></input>
        </div>
        <div name="ddlHolder" className="ddlHolder">
          <select multiple="multiple" className="ddlChoices"></select>
        </div>
        <div className="storyPart ui-widget-content">
          <textarea className="paragraph"></textarea>
          <hr />
          <div className="options">
            <div className="number">1</div>
            <textarea className="option"></textarea>
            <div className="number">2</div>
            <textarea className="option"></textarea>
          </div>
        </div>
      </div>

      <Helmet>
        <script src="./paragraph.js"></script>
      </Helmet>
    </div>
  );
}
