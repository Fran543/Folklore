import { useEffect } from "react";

export default function Warning({ parentToChild, removeWarning }) {
  useEffect(() => {
    import("./warning.css");
  });

  return (
    <div className="btnWarning">
      <p id={parentToChild}>{parentToChild}</p>
      <i className="bx bx-x icon" onClick={() => removeWarning}></i>
    </div>
  );
}
