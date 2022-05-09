import { useEffect, useState } from "react";

export default function BlogContent({ cleared }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    import("./blogContent.css");
    if(cleared){
        setInputValue("")
    }
  }, [cleared]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <textarea
      id="content"
      className="blogContent"
      value={inputValue}
      onChange={handleInput}
    ></textarea>
  );
}
