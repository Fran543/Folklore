import { Helmet } from "react-helmet";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";

export default function Paragraph() {

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    import("./paragraph.css");

    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }

    setSelectedFile(e.target.files[0])
}

  return (
    <Draggable>
      <div className="movableParagraph">
        <div className="holder">
        {selectedFile && <div className="paragraphImage" style={{backgroundImage: `url(${preview})`}}></div>}
          <div className="paragraphImg">
            <input type="file" id="paragraphImg" accept="image/*" onChange={onSelectFile}></input>
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
      </div>
    </Draggable>
  );
}
