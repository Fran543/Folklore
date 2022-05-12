import React from "react";
import { useEffect, useState } from "react";

function post({ post }) {

    return (
        <>
            <div className="row">
                <div className="col-sm-6" id="postContainer"></div>
            </div>
            <div className="row" id="optionRow">
                <div className="col-sm-6">
                    <p id="option1"></p>
                </div>
                <div className="col-sm-6">
                    <p id="option2"></p>
                </div>
            </div>
        </>
    );
}

export default post;