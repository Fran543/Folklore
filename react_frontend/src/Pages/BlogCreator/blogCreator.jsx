import {
  Sidebar,
  CircleMenuBlog,
  BlogContent,
  DeleteAnimation,
} from "../../Components";
import { useEffect, useState } from "react";

export default function BlogCreator() {
  const [cleared, setCleared] = useState(false);

  const clearTextArea = () =>{
    setCleared(true);
  }

  return (
    <>
      <Sidebar />
      <CircleMenuBlog clearTextArea={clearTextArea} />
      <BlogContent cleared={cleared}/>
      <DeleteAnimation />
    </>
  );
}
