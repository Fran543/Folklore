import React from "react";
import { useEffect } from "react";
import { Stories, TrendingStories } from "../../Components";
import { default as Navigation } from "../Navigation/navigation";

function Home() {

    useEffect(() => {
        import('./home.css');
    })

    return (
        <>
            <Navigation />
            <div className="home">
                <TrendingStories />
                <Stories />
            </div>
        </>

    );
}

export default Home;