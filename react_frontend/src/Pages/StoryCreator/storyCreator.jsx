import React from "react";
import { Sidebar, Canvas } from "../../Components";

export default function StoryCreator() {
    return (
        <div className="storyCreator">
            <Sidebar/>
            <Canvas/>
            {/* <InactiveAnimation/>
            <DeleteAnimation/> */}
        </div>
    );
}