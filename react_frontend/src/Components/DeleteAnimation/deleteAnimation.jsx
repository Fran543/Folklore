import { useEffect } from "react";

export default function DeleteAnimation() {
  useEffect(() => {
    import("./deleteAnimation.css");
  });

  return (
    <div className="cont">
      <div className="paper"></div>
      <button>
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Deleting
      </button>
      <div className="g-cont">
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
      </div>
    </div>
  );
}
