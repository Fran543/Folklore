import React from "react";
import { Stories, TrendingStories } from "../../Components";
import './home.css';

function Home() {

    return (
        <div className="home">
            <TrendingStories />
            <Stories />
        </div>
    );
}

export default Home;