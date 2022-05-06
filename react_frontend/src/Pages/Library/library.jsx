import React from "react";

function Library() {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" id="carouselContainer">
                <div class="carousel-item active">
                    <div class="story_card" id="cardGlow">
                        <div class="info_section">
                            <div class="row">
                                <div class="col-12 d-md-none">
                                    <img src="../IMAGES/storiesPlaceholder.avif" alt="image" class="img-fluid">
                                </div>
                                <div class="col-12 col-md-6 text-start">
                                    <h1 id="lbTitle">Story Name</h1>
                                    <div class="warnings">
                                        <span>Warning</span>
                                        <span> | </span>
                                        <span>Warning</span>
                                        <span> | </span>
                                        <span>Warning</span>
                                        <span> | </span>
                                        <span>Warning</span>
                                    </div>
                                </div>
                            </div>
                            <div class="story_desc">
                                <p class="text">
                                    Set in a world where fantasy creatures live side by side with humans. A human cop is
                                    forced to
                                    work with an Orc to find a weapon everyone is prepared to kill for.
                                </p>
                            </div>
                            <div class="story_social">
                                <button class="btns first">
                                    <i class="material-icons-outlined"> play_arrow</i>
                                    <p>Read</p>
                                </button>
                                <button class="btns second">
                                    <i class="material-icons-outlined">remove</i>
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>
                        <div class="blur_back card_back"></div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Library;