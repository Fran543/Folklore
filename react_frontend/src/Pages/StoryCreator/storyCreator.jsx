import React from "react";
import { Sidebar, Canvas, DeleteAnimation } from "../../Components";

export default function StoryCreator() {
    return (
        <div className="storyCreator">
            <Sidebar/>
            <Canvas/>
            <DeleteAnimation/>
        </div>
    );
}