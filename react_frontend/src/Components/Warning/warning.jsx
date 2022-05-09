import { useEffect } from "react";

export default function Warning({ warning, removeWarning }) {
  useEffect(() => {
    import("./warning.css");
  });

  return (
    <div className="btnWarning">
      <p id={warning.IDWarning}>{warning.WarningName}</p>
      <i className="bx bx-x icon" onClick={() => removeWarning(warning.IDWarning)}></i>
    </div>
  );
}
