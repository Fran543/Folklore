import React from "react";
import { useEffect } from "react";
import { Stories, TrendingStories } from "../../Components";

function Home() {


    useEffect(() => {
        import('./home.css')
    }, [])

    return (
        <div className="home">
            <TrendingStories />
            <Stories />
        </div>
    );
}

export default Home;