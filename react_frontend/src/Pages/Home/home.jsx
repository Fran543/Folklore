import React from "react";
import { Stories, TrendingStories } from "../../Components";
import './home.css';

function Home() {
    
    return (
        <div class="home">
            <TrendingStories />
            <Stories />
        </div>
    );
}

export default Home;