import { useEffect, useState } from "react";

export default function BlogContent({ cleared, post, setPost }) {

  useEffect(() => {
    import("./blogContent.css");
    if (cleared) {
    }
  }, [cleared]);

  return (
    <textarea
      id="content"
      className="blogContent"
      value={post}
      onChange={(e) => setPost(e.target.value)}
    ></textarea>
  );
}
